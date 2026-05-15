import { apiRequest } from "./api";

export function getEvents() {
  return apiRequest("/events/");
}

export function getEventById(eventCode) {
  return apiRequest(`/events/${eventCode}/`);
}

export function createEvent(data) {
  return apiRequest("/events/", {
    method: "POST",
    body: JSON.stringify(data),
  });
}

export async function getEventByCode(eventCode) {
  // return apiRequest(`/events/${eventCode}/`);
  const response = await fetch  (`${import.meta.env.VITE_API_URL}/events/${eventCode}/`);

  if (!response.ok) {
    throw new Error("Failed to fetch event");
  }

  return
}