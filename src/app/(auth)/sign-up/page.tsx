"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { EyeIcon, EyeOffIcon } from "lucide-react";

import AuthLayout from "@/components/auth-panel/AuthLayout";
import { ConfirmSignupDialog } from "./ConfirmDialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import {
  useCheckPhone,
  useSendOtp,
  useVerifyOtp,
  useRegisterUser,
} from "@/modules/auth/queries";

import {
  SignupForm,
  SignupStep,
  SignupErrors,
} from "./types";

import { parseApiError } from "@/lib/parse-api-errors";

export default function SignupPage() {
  const router = useRouter();

  const [step, setStep] = useState<SignupStep>("FORM");
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [referenceId, setReferenceId] = useState("");
  const [otp, setOtp] = useState("");

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [confirmPassword, setConfirmPassword] = useState("");

  const [form, setForm] = useState<SignupForm>({
    name: "",
    phone: "",
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState<SignupErrors & { confirmPassword?: string }>({});

  const checkPhone = useCheckPhone();
  const sendOtp = useSendOtp();
  const verifyOtp = useVerifyOtp();
  const registerUser = useRegisterUser();

  const validateForm = (): boolean => {
    const nextErrors: typeof errors = {};

    if (!form.name.trim()) {
      nextErrors.name = "Full name is required";
    }

    if (!/^[6-9]\d{9}$/.test(form.phone)) {
      nextErrors.phone = "Enter a valid 10-digit phone number";
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      nextErrors.email = "Enter a valid email address";
    }

    if (form.password.length < 6) {
      nextErrors.password = "Password must be at least 6 characters";
    }

    if (form.password !== confirmPassword) {
      nextErrors.confirmPassword = "Passwords do not match";
    }

    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const handleSendOtp = async () => {
    try {
      const exists = await checkPhone.mutateAsync({
        phone_number: form.phone,
      });

      if (exists.data.exists) {
        toast.error("Phone number already registered");
        return;
      }

      const res = await sendOtp.mutateAsync({
        phone_number: form.phone,
      });

      setReferenceId(res.data.reference_id);
      setStep("OTP");
      toast.success("OTP sent successfully");
    } catch (e: unknown) {
      toast.error(parseApiError(e));
    }
  };

  const handleVerifyAndRegister = async () => {
    if (otp.length !== 6) return;

    try {
      await verifyOtp.mutateAsync({
        reference_id: referenceId,
        otp,
      });

      await registerUser.mutateAsync({
        name: form.name.trim(),
        phone_number: form.phone,
        email: form.email.toLowerCase(),
        password: form.password,
        auth_type: "CREDENTIALS",
      });

      toast.success("Account created successfully");
      router.replace("/dashboard");
    } catch (e: unknown) {
      toast.error(parseApiError(e));
    }
  };

  return (
    <AuthLayout>
      <div className="space-y-6">
        <div className="text-center space-y-1">
          <h1 className="text-2xl font-semibold">Create account</h1>
          <p className="text-sm text-muted-foreground">
            Join Revamp Academy
          </p>
        </div>

        {step === "FORM" && (
          <div className="space-y-5">
            <Field label="Full Name" error={errors.name}>
              <Input
                value={form.name}
                className={errors.name ? "border-red-500 focus-visible:ring-red-500" : ""}
                onChange={(e) => {
                  setForm({ ...form, name: e.target.value });
                  setErrors({ ...errors, name: undefined });
                }}
              />
            </Field>

            <Field label="Phone Number" error={errors.phone}>
              <Input
                value={form.phone}
                className={errors.phone ? "border-red-500 focus-visible:ring-red-500" : ""}
                onChange={(e) => {
                  setForm({ ...form, phone: e.target.value });
                  setErrors({ ...errors, phone: undefined });
                }}
              />
            </Field>

            <Field label="Email Address" error={errors.email}>
              <Input
                type="email"
                value={form.email}
                className={errors.email ? "border-red-500 focus-visible:ring-red-500" : ""}
                onChange={(e) => {
                  setForm({ ...form, email: e.target.value });
                  setErrors({ ...errors, email: undefined });
                }}
              />
            </Field>

            {/* Password */}
            <Field label="Password" error={errors.password}>
              <div className="relative">
                <Input
                  type={showPassword ? "text" : "password"}
                  value={form.password}
                  className={`pr-10 ${
                    errors.password ? "border-red-500 focus-visible:ring-red-500" : ""
                  }`}
                  onChange={(e) => {
                    setForm({ ...form, password: e.target.value });
                    setErrors({ ...errors, password: undefined });
                  }}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((v) => !v)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground"
                >
                  {showPassword ? (
                    <EyeOffIcon className="h-4 w-4" />
                  ) : (
                    <EyeIcon className="h-4 w-4" />
                  )}
                </button>
              </div>
            </Field>

            {/* Confirm Password */}
            <Field label="Confirm Password" error={errors.confirmPassword}>
              <div className="relative">
                <Input
                  type={showConfirmPassword ? "text" : "password"}
                  value={confirmPassword}
                  className={`pr-10 ${
                    errors.confirmPassword ? "border-red-500 focus-visible:ring-red-500" : ""
                  }`}
                  onChange={(e) => {
                    setConfirmPassword(e.target.value);
                    setErrors({ ...errors, confirmPassword: undefined });
                  }}
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword((v) => !v)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground"
                >
                  {showConfirmPassword ? (
                    <EyeOffIcon className="h-4 w-4" />
                  ) : (
                    <EyeIcon className="h-4 w-4" />
                  )}
                </button>
              </div>
            </Field>

            <Button
              className="w-full cursor-pointer bg-primary text-primary-foreground font-semibold hover:bg-primary/90 active:scale-[0.98] transition"
              onClick={() => {
                if (!validateForm()) return;
                setConfirmOpen(true);
              }}
            >
              Send OTP
            </Button>
          </div>
        )}

        {step === "OTP" && (
          <div className="space-y-4">
            <Field label="OTP" error={otp.length !== 6 ? "OTP must be 6 digits" : undefined}>
              <Input
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
              />
            </Field>

            <Button
              className="w-full cursor-pointer bg-primary text-primary-foreground font-semibold hover:bg-primary/90 active:scale-[0.98] transition"
              disabled={verifyOtp.isPending || registerUser.isPending}
              onClick={handleVerifyAndRegister}
            >
              Verify & Create Account
            </Button>

            <button
              className="w-full cursor-pointer text-sm text-muted-foreground hover:underline"
              onClick={() => setStep("FORM")}
            >
              Edit details
            </button>
          </div>
        )}
      </div>

      <ConfirmSignupDialog
        open={confirmOpen}
        data={{
          name: form.name,
          phone: form.phone,
          email: form.email,
        }}
        loading={checkPhone.isPending || sendOtp.isPending}
        onCancel={() => setConfirmOpen(false)}
        onConfirm={() => {
          setConfirmOpen(false);
          handleSendOtp();
        }}
      />
    </AuthLayout>
  );
}

function Field({
  label,
  error,
  children,
}: {
  label: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="space-y-1.5">
      <Label>{label}</Label>
      {children}
      {error && <p className="text-xs text-red-500">{error}</p>}
    </div>
  );
}