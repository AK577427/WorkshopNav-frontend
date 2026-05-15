import { apiRequest } from "./api";

export function getEvents() {
  return apiRequest("/events/");
}

export async function getEventById(eventID) {
  // return apiRequest(`/events/${eventID}/`);
  const response = await fetch  (`${import.meta.env.VITE_API_URL}/event/${eventID}/`);
  // console.log(response);
  

  if (!response.ok) {
    throw new Error("Failed to fetch event");
  }

  return response.json();
}

export function createEvent(data) {
  return apiRequest("/events/", {
    method: "POST",
    body: JSON.stringify(data),
  });
}

export async function getEventByCode(eventCode) {
  // return apiRequest(`/events/${eventCode}/`);
  const response = await fetch  (`${import.meta.env.VITE_API_URL}/events/join/${eventCode}/`);
  // console.log(response);
  

  if (!response.ok) {
    throw new Error("Failed to fetch event");
  }

  return response.json();
}