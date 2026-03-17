import { apiRequest } from "./../apiServices"; // Path check karlein

export const placeOrder = async (orderData) => {
  try {
    // Ye aapke backend ke /api/orders route ko hit karega
    const data = await apiRequest("/orders", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(orderData),
    });
    return data;
  } catch (error) {
    throw error;
  }
};