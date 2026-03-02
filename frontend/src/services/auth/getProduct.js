// src/services/auth.js
import { apiRequest } from "./../apiServices";
// import { configuration } from "../config";

/**
 * Handles user login.
 * @param {string} email The user's email.
 * @param {string} password The user's password.
 * @returns {Promise<object|null>} User data and token on success, null on failure.
 */
export async function getProduct() {
  try {
    const data = await apiRequest("/getProduct", {
      method: "GET",
        credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
    });
    console.log(data, "line 21");
    return data;
  } catch (error) {
    console.error("Failed to fetch data", error.message);
    // Specific error handling for login can go here
    throw error;
  }
}
