import { apiRequest } from "../apiServices";

export async function deleteProduct(id) {
  try {

    const data = await apiRequest(`/delete/${id}`, {
      method: "DELETE",
    });

    return data;

  } catch (error) {
    console.error("Delete product error:", error.message);
    throw error;
  }
}