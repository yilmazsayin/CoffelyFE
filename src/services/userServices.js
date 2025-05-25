import api from "./api";

const getProfile = async () => {
  try {
    const res = await api.get("/api/user/profile");
    return res.data;
  } catch (error) {
    return error.response.data;
  }
};

const deleteAccount = async () => {
  try {
    const res = await api.delete("/api/user/delete");
    return res.data;
  } catch (error) {
    console.log("SEND_EMAIL_VERIFICATION_ERROR", error);
    return error.response.data;
  }
};

export { getProfile, deleteAccount };
