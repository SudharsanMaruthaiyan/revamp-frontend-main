"use client";

import { useState } from "react";
import { useSession } from "next-auth/react";
import { toast } from "sonner";
import { EyeIcon, EyeOffIcon } from "lucide-react";

import AuthLayout from "@/components/auth-panel/AuthLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import { useChangePassword } from "@/modules/auth/queries";
import {
  ChangePasswordForm,
  ChangePasswordErrors,
} from "./types";
import { parseApiError } from "@/lib/parse-api-errors";

export default function ChangePasswordPage() {
  const { data: session, status } = useSession();
  const changePassword = useChangePassword();

  const [form, setForm] = useState<ChangePasswordForm>({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState<ChangePasswordErrors>({});
  const [show, setShow] = useState({
    current: false,
    next: false,
    confirm: false,
  });

  if (status === "loading") return null;

  const validate = (): boolean => {
    const nextErrors: ChangePasswordErrors = {};

    if (!form.currentPassword) {
      nextErrors.currentPassword = "Current password is required";
    }

    if (form.newPassword.length < 6) {
      nextErrors.newPassword = "Password must be at least 6 characters";
    }

    if (form.newPassword !== form.confirmPassword) {
      nextErrors.confirmPassword = "Passwords do not match";
    }

    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const handleSubmit = async () => {
    if (!validate()) return;

    try {
      await changePassword.mutateAsync({
        user_id: session!.user.userId,
        current_password: form.currentPassword,
        new_password: form.newPassword,
      });

      toast.success("Password updated successfully");

      setForm({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      });
      setErrors({});
    } catch (e: unknown) {
      toast.error(parseApiError(e));
    }
  };

  return (
    <AuthLayout>
      <div className="w-full max-w-md mx-auto space-y-6">
        <div className="space-y-1 text-center">
          <h1 className="text-2xl font-semibold">Change password</h1>
          <p className="text-sm text-muted-foreground">
            Update your account password
          </p>
        </div>

        <div className="space-y-5">
          <Field label="Current password" error={errors.currentPassword}>
            <PasswordInput
              value={form.currentPassword}
              visible={show.current}
              onToggle={() =>
                setShow({ ...show, current: !show.current })
              }
              onChange={(v) => {
                setForm({ ...form, currentPassword: v });
                setErrors({ ...errors, currentPassword: undefined });
              }}
            />
          </Field>

          <Field label="New password" error={errors.newPassword}>
            <PasswordInput
              value={form.newPassword}
              visible={show.next}
              onToggle={() =>
                setShow({ ...show, next: !show.next })
              }
              onChange={(v) => {
                setForm({ ...form, newPassword: v });
                setErrors({ ...errors, newPassword: undefined });
              }}
            />
          </Field>

          <Field
            label="Confirm new password"
            error={errors.confirmPassword}
          >
            <PasswordInput
              value={form.confirmPassword}
              visible={show.confirm}
              onToggle={() =>
                setShow({ ...show, confirm: !show.confirm })
              }
              onChange={(v) => {
                setForm({ ...form, confirmPassword: v });
                setErrors({
                  ...errors,
                  confirmPassword: undefined,
                });
              }}
            />
          </Field>

          <Button
            className="
              w-full
              bg-primary text-primary-foreground
              text-black
              font-semibold
              hover:bg-primary/90
              active:scale-[0.98]
              disabled:opacity-60
              transition
              cursor-pointer
            "
            onClick={handleSubmit}
            disabled={changePassword.isPending}
          >
            {changePassword.isPending
              ? "Updating password..."
              : "Update password"}
          </Button>
        </div>
      </div>
    </AuthLayout>
  );
}

function PasswordInput({
  value,
  visible,
  onToggle,
  onChange,
}: {
  value: string;
  visible: boolean;
  onToggle: () => void;
  onChange: (v: string) => void;
}) {
  return (
    <div className="relative">
      <Input
        type={visible ? "text" : "password"}
        value={value}
        className="pr-10"
        onChange={(e) => onChange(e.target.value)}
      />
      <button
        type="button"
        onClick={onToggle}
        className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground cursor-pointer"
      >
        {visible ? (
          <EyeOffIcon className="h-4 w-4" />
        ) : (
          <EyeIcon className="h-4 w-4" />
        )}
      </button>
    </div>
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
      {error && (
        <p className="text-xs text-red-500">{error}</p>
      )}
    </div>
  );
}