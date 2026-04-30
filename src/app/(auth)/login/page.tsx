"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { EyeIcon, EyeOffIcon } from "lucide-react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

import AuthLayout from "@/components/auth-panel/AuthLayout";
import GoogleLoginButton from "@/components/auth-panel/GoogleLoginButton";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import { LoginErrors } from "./types";

export default function LoginPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<LoginErrors>({});

  useEffect(() => {
    router.prefetch("/dashboard");
  }, [router]);

  const validate = (): boolean => {
    const nextErrors: LoginErrors = {};

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      nextErrors.email = "Enter a valid email address";
    }

    if (!password) {
      nextErrors.password = "Password is required";
    }

    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const handleLogin = async () => {
    if (!validate()) return;

    setLoading(true);
    setErrors({});

    try {
      const result = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });

      if (result?.error) {
        try {
          const parsed = JSON.parse(result.error);
          setErrors({
            form:
              parsed?.message?.error ??
              parsed?.message ??
              result.error,
          });
        } catch {
          setErrors({ form: result.error });
        }
        return;
      }

      toast.success("Login successful");
      router.push("/dashboard");
      router.refresh();
    } catch (e: unknown) {
      setErrors({ form: "Something went wrong. Please try again." });
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthLayout>
      <div className="space-y-6">
        <div className="text-center space-y-1">
          <h1 className="text-2xl font-semibold">Welcome back</h1>
          <p className="text-sm text-muted-foreground">
            Sign in to continue
          </p>
        </div>

        {errors.form && (
          <div className="rounded-md border border-red-500 bg-red-50 px-3 py-2 text-sm text-red-600">
            {errors.form}
          </div>
        )}

        <div className="space-y-4">
          <Field label="Email Address" error={errors.email}>
            <Input
              type="email"
              value={email}
              className={errors.email ? "border-red-500 focus-visible:ring-red-500" : ""}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                setEmail(e.target.value);
                setErrors({ ...errors, email: undefined });
              }}
            />
          </Field>

          <Field label="Password" error={errors.password}>
            <div className="relative">
              <Input
                type={showPassword ? "text" : "password"}
                value={password}
                className={errors.password ? "border-red-500 focus-visible:ring-red-500 pr-10" : "pr-10"}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  setPassword(e.target.value);
                  setErrors({ ...errors, password: undefined });
                }}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground cursor-pointer"
              >
                {showPassword ? (
                  <EyeOffIcon className="h-4 w-4" />
                ) : (
                  <EyeIcon className="h-4 w-4" />
                )}
              </button>
            </div>
          </Field>

          <div className="flex justify-end">
            <Link
              href="/forgot-password"
              className="text-sm text-primary hover:underline cursor-pointer"
            >
              Forgot password?
            </Link>
          </div>

          <Button
            className="
              w-full
              bg-primary text-primary-foreground
              text-black
              font-semibold
              hover:bg-primary/90
              active:scale-[0.98]
              disabled:opacity-60
              disabled:pointer-events-none
              transition
              cursor-pointer
            "
            disabled={loading}
            onClick={handleLogin}
          >
            {loading ? "Signing in..." : "Sign In"}
          </Button>

        </div>

        <div className="flex items-center gap-3">
          <div className="flex-1 border-t" />
          <span className="text-xs text-muted-foreground">
            or continue with
          </span>
          <div className="flex-1 border-t" />
        </div>

        <GoogleLoginButton callbackUrl="/dashboard" />

        <div className="text-center text-sm">
          <span className="text-muted-foreground">
            Don’t have an account?
          </span>{" "}
          <Link
            href="/sign-up"
            className="font-medium text-primary hover:underline cursor-pointer"
          >
            Create an account
          </Link>
        </div>
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
    <div className="space-y-1">
      <Label>{label}</Label>
      {children}
      {error && <p className="text-xs text-red-500">{error}</p>}
    </div>
  );
}