import { apiRequest } from "./api";

export function captureEmail(eventId, data) {
  return apiRequest(`/events/${eventId}/emails`, {
    method: "POST",
    body: JSON.stringify(data),
  });
}