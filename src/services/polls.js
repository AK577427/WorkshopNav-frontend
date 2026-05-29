import {apiRequest} from "./api";

export function getPolls(eventId) {
  return apiRequest(`/events/${eventId}/polls/`);
}

export function submitPollResponse(pollId, optionId) {
  return apiRequest(`/polls/${pollId}/responses/`, {
    method: "POST",
    body: JSON.stringify({ 
       option: optionId.option,
     }),
  });
}

export function createPoll(eventId, data) {
  return apiRequest(`/events/${eventId}/polls/`, {
    method: "POST",
    body: JSON.stringify({
      question: data.question,
      options: data.options,
    }),
  });
}

export function getPollResponses(pollId) {
  return apiRequest(`/polls/${pollId}/responses/`);
}
