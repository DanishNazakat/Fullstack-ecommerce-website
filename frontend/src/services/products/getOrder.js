import { apiRequest } from "./../apiServices";

export const getAllOrders = async () => {
  try {
    const data = await apiRequest("/orders", {
      method: "GET",
    });
    // Agar backend se 'orders' array direct aa raha hai ya data object ke andar
    return {
      success: true,
      orders: data.orders || data || [] // Check both possibilities
    };
  } catch (error) {
    console.error("API Error:", error);
    throw error;
  }
};