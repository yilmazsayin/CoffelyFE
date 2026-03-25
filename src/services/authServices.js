import api from "./api";

const register = async (userData) => {
  try {
    const res = await api.post("/api/auth/register", userData);
    return res.data;
  } catch (error) {
    return error.response.data;
  }
};

const resetPassword = async (email, newPassword, verificationCode) => {
  try {
    const res = await api.post("/api/auth/resetPassword", {
      email,
      newPassword,
      verificationCode,
    });
    return res.data;
  } catch (error) {
    console.log("RESET_PASSWORD_ERROR", error.response?.data || error.message);
    return (
      error.response?.data || { success: false, message: "Sunucu hatası." }
    );
  }
};

const sendEmailVerification = async (email, type) => {
  try {
    const res = await api.post("/api/auth/sendVerificationEmail", {
      email,
      type,
    });
    return res.data;
  } catch (error) {
    console.log("SEND_EMAIL_VERIFICATION_ERROR", error);
    return error.response.data;
  }
};

const verifyVerificationCode = async (email, code) => {
  try {
    const res = await api.post("/api/auth/verifyVerificationCode", {
      email,
      code,
    });
    return res.data;
  } catch (error) {
    console.log("VERIFY_VERIFICATION_CODE_ERROR", error.response.data);
    return error.response.data;
  }
};

const login = async (email, password) => {
  try {
    const res = await api.post("/api/auth/login", { email, password });
    return res.data;
  } catch (error) {
    return error.response.data;
  }
};

export { register, login, verifyVerificationCode, sendEmailVerification, resetPassword };