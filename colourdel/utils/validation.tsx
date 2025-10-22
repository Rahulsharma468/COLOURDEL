export const validateEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export const validatePhone = (phone: string): boolean => {
  const phoneRegex = /^\+?[\d\s\-\(\)]{10,}$/;
  return phoneRegex.test(phone.replace(/\s/g, ""));
};

export const validateEmailOrPhone = (
  input: string
): { isValid: boolean; type: "email" | "phone" | "invalid" } => {
  const trimmedInput = input.trim();

  if (validateEmail(trimmedInput)) {
    return { isValid: true, type: "email" };
  }

  if (validatePhone(trimmedInput)) {
    return { isValid: true, type: "phone" };
  }

  return { isValid: false, type: "invalid" };
};

export const validatePassword = (
  password: string
): { isValid: boolean; message: string } => {
  if (password.length < 6) {
    return {
      isValid: false,
      message: "Password must be at least 6 characters",
    };
  }
  return { isValid: true, message: "" };
};

export const validateOTP = (otp: string): boolean => {
  return /^\d{6}$/.test(otp);
};
