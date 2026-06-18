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

export function getDeviceToken() {
  let token = localStorage.getItem("device_token");
  if (!token) {
    token = crypto.randomUUID();
    localStorage.setItem("device_token", token);
  }
  return token;
}