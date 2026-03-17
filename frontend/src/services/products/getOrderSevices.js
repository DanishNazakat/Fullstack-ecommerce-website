import { apiRequest } from "./../apiServices";

export const getMyOrders = async () => {
  try {
    const res = await apiRequest("/getOrders", {
      method: "GET",
    });
    // Postman mein humne dekha ke data 'res.orders' mein aa raha hai
    return res; 
  } catch (error) {
    console.error("Order Service Error:", error);
    throw error;
  }
};