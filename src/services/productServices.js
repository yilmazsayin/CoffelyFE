import api from "./api";

const createProduct = async (formData) => {
  try {
    const res = await api.post("/api/product/create", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return res.data;
  } catch (error) {
    return error.response.data;
  }
};

const updateProduct = async (formData) => {
  try {
    const res = await api.put("/api/product/update", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return res.data;
  } catch (error) {
    return error.response.data;
  }
};

const fetchProducts = async () => {
  try {
    const res = await api.get("/api/product/list");
    return res.data;
  } catch (error) {
    return error.response.data;
  }
};

const deleteProduct = async (id) => {
  try {
    const res = await api.post("/api/product/delete", { id });
    return res.data;
  } catch (error) {
    return error.response.data;
  }
};

const fetchProductById = async (id) => {
  try {
    const res = await api.get(`/api/product/${id}`);
    return res.data;
  } catch (error) {
    return error.response.data;
  }
};

export { createProduct, fetchProducts, deleteProduct, fetchProductById, updateProduct};
