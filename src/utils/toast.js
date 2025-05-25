// utils/toast.js
import { toast } from "react-toastify";

const commonOptions = {
  position: "top-center",
  autoClose: 1250,
  hideProgressBar: true,
  closeOnClick: true,
  pauseOnHover: false,
  draggable: false,
};

const toastHelper = {
  success: (message, options = {}) =>
    toast.success(message, { ...commonOptions, ...options }),

  error: (message, options = {}) =>
    toast.error(message, { ...commonOptions, ...options }),

  info: (message, options = {}) =>
    toast.info(message, { ...commonOptions, ...options }),

  warning: (message, options = {}) =>
    toast.warning(message, { ...commonOptions, ...options }),

  default: (message, options = {}) =>
    toast(message, { ...commonOptions, ...options }),
};

export default toastHelper;
