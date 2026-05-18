import { apiRequest } from "./api";

export function signupFacilitator(data) {
  return apiRequest("/signup/", {
    method: "POST",
    body: JSON.stringify(data),
  });
}

export function requestPasswordReset(data) {
  return apiRequest("/password-reset/", {
    method: "POST",
    body: JSON.stringify(data),
  });
}

export function confirmPasswordReset(data) {
  return apiRequest("/password-reset-confirm/", {
    method: "POST",
    body: JSON.stringify(data),
  });
}