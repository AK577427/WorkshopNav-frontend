import { apiRequest } from "./api";

export function submitFeedback(eventId, data) {
  return apiRequest(`/events/${eventId}/feedback/`, {
    method: "POST",
    body: JSON.stringify({
      event: eventId,
      rating: data.rating,
      comment: data.comment,
    }),
  });
}