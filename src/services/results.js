import { apiRequest } from "./api";

export function getPolls(eventId) {
  return apiRequest(`/events/${eventId}/polls/`);
}

export function getPollResults(pollId) {
  return apiRequest(`/polls/${pollId}/results/`);
}

export function getQuestions(eventId) {
  return apiRequest(`/events/${eventId}/questions/`);
}

export function getFeedback(eventId) {
  return apiRequest(`/events/${eventId}/feedback/`);
}

export function getEmails(eventId) {
  return apiRequest(`/events/${eventId}/emails/`);
}