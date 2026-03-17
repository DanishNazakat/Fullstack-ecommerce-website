import { apiRequest } from "./../apiServices";

export const updateOrderStatus = async (id, status) => {
  try {
    return await apiRequest(`/orders/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status }),
    });
  } catch (error) {
    throw error;
  }
};