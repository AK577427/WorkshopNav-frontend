import { apiRequest } from "./api";

export async function postQuestion(eventId, data) {
  return apiRequest(`/events/${eventId}/questions/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
        question_text: data.text,
        anonymous: data.anonymous,
        device_token : localStorage.getItem("device_token"),
        attendee_name : localStorage.getItem("attendeeName"),
    }),
  });
    }

export async function getQuestions(eventId) {
  return apiRequest(`/events/${eventId}/questions/`, {
    method: "GET",
  });
}

export async function upvoteQuestion(questionId) {
  return apiRequest(`/questions/${questionId}/upvote/`, {
    method: "PATCH",
  });
}
