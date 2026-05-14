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

export function getEventByCode(eventCode) {
  return apiRequest(`/events/${eventCode}/`);
}