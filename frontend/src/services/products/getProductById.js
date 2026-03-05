import { apiRequest } from "../apiServices";

export async function getProductById(id) {
  try {
    const data = await apiRequest(`/getProductById/${id}`, {
      method: "GET",
    });

    return data;
  } catch (error) {
    console.error("Error fetching product:", error.message);
    throw error;
  }
}