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
    headers: {
      "Authorization": `Bearer ${window.localStorage.getItem("access")}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      question: data.question,
      options: data.options,
    }),
  });
}

export function getPollResponses(pollId) {
  return apiRequest(`/polls/${pollId}/responses/`);
}

export function launchPoll(pollId) {
  return apiRequest(`/polls/${pollId}/`, {
    method: "PUT",
    headers: {
      "Authorization": `Bearer ${window.localStorage.getItem("access")}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      is_active: true
    })
  });
}

export function deletePoll(pollId) {
  return apiRequest(`/polls/${pollId}/`, {
    method: "DELETE",
    headers: {
      "Authorization": `Bearer ${window.localStorage.getItem("access")}`,
    },
  });
}

export function updatePollStatus(pollId) {
  return apiRequest(`/polls/${pollId}/`, {
    method: "PUT",
    headers: {
      "Authorization": `Bearer ${window.localStorage.getItem("access")}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      is_active: false
    })
  });
}
