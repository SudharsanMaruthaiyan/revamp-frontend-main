export type SignupStep = "FORM" | "OTP";

export interface SignupForm {
  name: string;
  phone: string;
  email: string;
  password: string;
}

export interface ConfirmSignupData {
  name: string;
  phone: string;
  email: string;
}

export type SignupErrors = Partial<Record<keyof SignupForm, string>>;