export interface User {
  id: string;
  email?: string;
  phone?: string;
  name: string;
}

export interface AuthFormData {
  emailOrPhone: string;
  password: string;
  confirmPassword?: string;
  name?: string;
}

export interface OTPData {
  code: string;
  emailOrPhone: string;
}

export type AuthStackParamList = {
  Login: undefined;
  Register: undefined;
  OTP: { emailOrPhone: string; isRegistration: boolean };
  Main: undefined; // For the tab navigator
};