import { apiRequest } from "./api";

export async function joinEvent(eventCode, deviceToken, name){
    return apiRequest(`/events/${eventCode}/join/`, {
        method: "POST", 
        body: JSON.stringify({
            device_token : deviceToken,
            name,
        }),
    });
}

export async function getAttendees(eventId){
    return apiRequest(`/events/${eventId}/attendees/`, {
        method: "GET",
    });
}