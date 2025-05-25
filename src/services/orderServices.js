import api from "./api";

const createOrder = async (orderData) => {
  try {
    const res = await api.post("/api/orders/create", orderData);
    return res.data;
  } catch (error) {
    return error.response.data;
  }
};

const listOrders = async () => {
    try {
    const res = await api.get("/api/orders/list");
    return res.data;
  } catch (error) {
    return error.response.data;
  }
}



export { createOrder, listOrders };
