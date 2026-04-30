export interface BaseResponse<T = null> {
    success: boolean;
    message: string | { error: string };
    data: T;
  }
  
  //forgot-password
  export interface ForgotPasswordPayload {
    email: string;
  }
  
  //reset-password
  export interface ResetPasswordPayload {
    user_id: string;
    token: string;
    new_password: string;
  }
  
  //change-password
  export interface ChangePasswordPayload {
    user_id: string;
    current_password: string;
    new_password: string;
  }
  
  export interface ChangePasswordResponse {
    user_id: string;
    updated_at: string;
  }  
  
  //refresh-token
  export interface RefreshTokenPayload {
    refresh_token: string;
  }
  
  export interface RefreshTokenResponse {
    access_token: string;
  }
  
  // check phone exists
  export interface CheckPhonePayload {
    phone_number: string;
  }
  
  export interface CheckPhoneResponse {
    exists: boolean;
  }
  
  // send otp
  export interface SendOtpPayload {
    phone_number: string;
  }
  
  export interface SendOtpResponse {
    reference_id: string;
    phone_number: string;
  }
  
  // verify otp
  export interface VerifyOtpPayload {
    reference_id: string;
    otp: string;
  }
  
  export interface VerifyOtpResponse {
    success: boolean;
    message: string;
  }
  
  // resend otp
  export interface ResendOtpPayload {
    reference_id: string;
  }
  
  export interface ResendOtpResponse {
    reference_id: string;
    phone_number: string;
  }
  
  // register (credentials)
  export interface RegisterPayload {
    name: string;
    phone_number: string;
    password: string;
    email?: string;
    auth_type: "CREDENTIALS";
  }
  
  export interface RegisterResponse {
    user: {
      user_id: string;
      name: string;
      email?: string | null;
      phone_number: string;
      auth_type: "CREDENTIALS" | "GOOGLE";
      is_verified: boolean;
    };
  }