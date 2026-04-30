export interface ChangePasswordForm {
    currentPassword: string;
    newPassword: string;
    confirmPassword: string;
  }
  
  export type ChangePasswordErrors = Partial<
    Record<keyof ChangePasswordForm, string>
  >;  