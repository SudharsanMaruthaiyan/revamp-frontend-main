"use client";

import { useState } from "react";
import Link from "next/link";

import AuthLayout from "@/components/auth-panel/AuthLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import { useForgotPassword } from "@/modules/auth/queries";
import {
  ForgotPasswordForm,
  ForgotPasswordErrors,
} from "../../types";

export default function ForgotPasswordPage() {
  const forgotPassword = useForgotPassword();

  const [form, setForm] = useState<ForgotPasswordForm>({
    email: "",
  });

  const [errors, setErrors] = useState<ForgotPasswordErrors>({});
  const [submitted, setSubmitted] = useState(false);

  const validate = (): boolean => {
    const nextErrors: ForgotPasswordErrors = {};

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      nextErrors.email = "Enter a valid email address";
    }

    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const handleSubmit = async () => {
    if (!validate()) return;

    try {
      await forgotPassword.mutateAsync({ email: form.email });
      setSubmitted(true);
    } catch {
      setSubmitted(true);
    }
  };

  return (
    <AuthLayout>
      <div className="space-y-6">
        <div className="text-center space-y-1">
          <h1 className="text-2xl font-semibold">Forgot password</h1>
          <p className="text-sm text-muted-foreground">
            We’ll send you a reset link if the account exists
          </p>
        </div>

        {submitted ? (
          <div className="space-y-5">
            <div className="rounded-md border border-green-500 bg-green-50 px-3 py-2 text-sm text-green-700">
              If an account exists for this email, a reset link has been sent.
            </div>

            <div className="text-center">
              <Link
                href="/login"
                className="text-sm font-medium text-primary hover:underline"
              >
                Back to login
              </Link>
            </div>
          </div>
        ) : (
          <div className="space-y-5">
            <Field label="Email address" error={errors.email}>
              <Input
                type="email"
                value={form.email}
                className={
                  errors.email
                    ? "border-red-500 focus-visible:ring-red-500"
                    : ""
                }
                onChange={(e) => {
                  setForm({ email: e.target.value });
                  setErrors({ email: undefined });
                }}
              />
            </Field>

            <Button
              className="w-full cursor-pointer bg-primary text-primary-foreground font-semibold hover:bg-primary/90 active:scale-[0.98] transition"
              disabled={forgotPassword.isPending}
              onClick={handleSubmit}
            >
              {forgotPassword.isPending
                ? "Sending reset link..."
                : "Send reset link"}
            </Button>

            <div className="text-center">
              <Link
                href="/login"
                className="text-sm text-primary hover:underline"
              >
                Back to login
              </Link>
            </div>
          </div>
        )}
      </div>
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