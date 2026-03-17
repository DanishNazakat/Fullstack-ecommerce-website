import { apiRequest } from "../apiServices";

export async function addProduct(formData) {
  try {
    return await apiRequest(`/addProduct`, {
      method: "POST",
      body: formData, // Pura FormData object bhej rahe hain
    });
  } catch (error) {
    console.error("Add Product Service Error:", error.message);
    throw error;
  }
}