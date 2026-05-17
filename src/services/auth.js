import { apiRequest } from "./api";

export function signupFacilitator(data) {
  return apiRequest("/signup/", {
    method: "POST",
    body: JSON.stringify(data),
  });
}

export function resetPassword(data) {
  const accessToken = window.localStorage.getItem("access");

  return apiRequest("/change-password/", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
    body: JSON.stringify(data),
  });
}