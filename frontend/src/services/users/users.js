import { apiRequest } from "../apiServices"; // Aapka generic fetch function

// Saare users lane ke liye (Route: /api/all)
export const getAllUsers = () => apiRequest("/allUser");

// User delete karne ke liye (Route: /api/delete/:id)
export const deleteUser = (id) => apiRequest(`/deleteUser/${id}`, { 
  method: "DELETE" 
});

// User update karne ke liye (Route: /api/update/:id)
export const updateUser = (id, data) => apiRequest(`/updateUser/${id}`, {
  method: "PUT",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify(data),
});