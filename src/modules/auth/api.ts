import axios from "axios";
import type {
  BaseResponse,
  ForgotPasswordPayload,
  ResetPasswordPayload,
  RefreshTokenPayload,
  RefreshTokenResponse,
  ChangePasswordPayload, ChangePasswordResponse,
  CheckPhonePayload, CheckPhoneResponse, 
  SendOtpPayload, SendOtpResponse,
  VerifyOtpPayload, VerifyOtpResponse, 
  ResendOtpPayload, ResendOtpResponse, 
  RegisterPayload, RegisterResponse,
} from "./types";
import { axiosBase, axiosInstance } from "@/lib/axios-instance";

//forgot-password
export const forgotPasswordApi = async (data: ForgotPasswordPayload): Promise<BaseResponse> => {
  const response = await axiosBase.post<BaseResponse>("/auth/forgot-password", data);
  return response.data;
};

//reset-password
export const resetPasswordApi = async (data: ResetPasswordPayload): Promise<BaseResponse> => {
  const response = await axiosBase.post<BaseResponse>("/auth/reset-password", data);
  return response.data;
};

//change-password
export const changePasswordApi = async (
  data: ChangePasswordPayload
): Promise<BaseResponse<ChangePasswordResponse>> => {
  const response = await axiosInstance.post<BaseResponse<ChangePasswordResponse>>(
    "/auth/change-password",
    data
  );
  return response.data;
};

//refresh-token
export const refreshTokenApi = async (data: RefreshTokenPayload): Promise<BaseResponse<RefreshTokenResponse>> => {
  const response = await axiosBase.post<BaseResponse<RefreshTokenResponse>>("/auth/refresh-token", data);
  return response.data;
};

//check phone number exists
export const checkPhoneApi = async (
  data: CheckPhonePayload
): Promise<BaseResponse<CheckPhoneResponse>> => {
  const response = await axiosBase.get<BaseResponse<CheckPhoneResponse>>(
    "/user/check-phone",
    { params: data }
  );
  return response.data;
};

//send otp
export const sendOtpApi = async (
  data: SendOtpPayload
): Promise<BaseResponse<SendOtpResponse>> => {
  const response = await axiosBase.post<BaseResponse<SendOtpResponse>>(
    "/auth/send-otp",
    data
  );
  return response.data;
};

//verify otp
export const verifyOtpApi = async (
  data: VerifyOtpPayload
): Promise<BaseResponse<VerifyOtpResponse>> => {
  const response = await axiosBase.post<BaseResponse<VerifyOtpResponse>>(
    "/auth/verify-otp",
    data
  );
  return response.data;
};

//resent otp
export const resendOtpApi = async (
  data: ResendOtpPayload
): Promise<BaseResponse<ResendOtpResponse>> => {
  const response = await axiosBase.post<BaseResponse<ResendOtpResponse>>(
    "/auth/resend-otp",
    data
  );
  return response.data;
};

//register otp
export const registerApi = async (
  data: RegisterPayload
): Promise<BaseResponse<RegisterResponse>> => {
  const response = await axiosBase.post<BaseResponse<RegisterResponse>>(
    "/auth/register",
    {
      ...data,
      auth_type: "CREDENTIALS",
    }
  );
  return response.data;
};