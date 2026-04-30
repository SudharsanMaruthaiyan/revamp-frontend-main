import { useMutation } from "@tanstack/react-query";
import {
  forgotPasswordApi,
  resetPasswordApi,
  refreshTokenApi,
  changePasswordApi,
  checkPhoneApi,
  sendOtpApi,
  verifyOtpApi,
  resendOtpApi,
  registerApi,
} from "./api";
import type {
  ForgotPasswordPayload,
  ResetPasswordPayload,
  RefreshTokenPayload,
  ChangePasswordPayload,
  CheckPhonePayload,
  SendOtpPayload,
  VerifyOtpPayload,
  ResendOtpPayload,
  RegisterPayload,
} from "./types";
import { toast } from "sonner";
import { parseApiError } from "@/lib/parse-api-errors";

/**
 * Forgot Password Mutation
 */
export const useForgotPassword = () =>
  useMutation({
    mutationFn: (data: ForgotPasswordPayload) => forgotPasswordApi(data),
    onSuccess: () => {
    },
    onError: (error) => {
      toast.error(parseApiError(error));
    }
  });

/**
 * Reset Password Mutation
 */
export const useResetPassword = () =>
  useMutation({
    mutationFn: (data: ResetPasswordPayload) => resetPasswordApi(data),
    onSuccess: () => {
    },
    onError: (error) => {
      toast.error(parseApiError(error));
    }
  });

/**
 * Change Password Mutation
 */
export const useChangePassword = () =>
  useMutation({
    mutationFn: (data: ChangePasswordPayload) => changePasswordApi(data),
    onSuccess: (res) => {
      toast.success(res.message as string);
    },
    onError: (error) => {
      toast.error(parseApiError(error));
    }
  });

/**
 * Refresh Token Mutation
 */
export const useRefreshToken = () =>
  useMutation({
    mutationFn: (data: RefreshTokenPayload) => refreshTokenApi(data),
    onSuccess: () => {
    },
    onError: (error) => {
      toast.error(parseApiError(error));
    }
  });

  /**
 * Check Phone Exists Mutation
 */
export const useCheckPhone = () =>
  useMutation({
    mutationFn: (data: CheckPhonePayload) => checkPhoneApi(data),
    onError: (error) => {
      toast.error(parseApiError(error));
    },
  });

/**
 * Send OTP Mutation
 */
export const useSendOtp = () =>
  useMutation({
    mutationFn: (data: SendOtpPayload) => sendOtpApi(data),
    onSuccess: () => {
      toast.success("OTP sent successfully");
    },
    onError: (error) => {
      toast.error(parseApiError(error));
    },
  });

/**
 * Verify OTP Mutation
 */
export const useVerifyOtp = () =>
  useMutation({
    mutationFn: (data: VerifyOtpPayload) => verifyOtpApi(data),
    onSuccess: () => {
      toast.success("OTP verified successfully");
    },
    onError: (error) => {
      toast.error(parseApiError(error));
    },
  });

/**
 * Resend OTP Mutation
 */
export const useResendOtp = () =>
  useMutation({
    mutationFn: (data: ResendOtpPayload) => resendOtpApi(data),
    onSuccess: () => {
      toast.success("OTP resent successfully");
    },
    onError: (error) => {
      toast.error(parseApiError(error));
    },
  });

/**
 * Register User (Credentials Signup)
 */
export const useRegisterUser = () =>
  useMutation({
    mutationFn: (data: RegisterPayload) => registerApi(data),
    onSuccess: () => {
      toast.success("Registration successful");
    },
    onError: (error) => {
      toast.error(parseApiError(error));
    },
  });
