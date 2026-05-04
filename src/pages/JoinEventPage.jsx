import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getEventByCode } from "../services/events";

function JoinEventPage() {
  const { eventCode } = useParams();
  const navigate = useNavigate();

  const [event, setEvent] = useState(null);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function loadEvent() {
      try {
        const data = await getEventByCode(eventCode);
        setEvent(data);
      } catch (err) {
        setError("Event not found. Please check your code.");
      } finally {
        setIsLoading(false);
      }
    }

    loadEvent();
  }, [eventCode]);

  if (isLoading) return <p>Loading event...</p>;

  if (error) return <p>{error}</p>;

  return (
    <div>
      <h1>{event.title}</h1>
      <p>Event code: {event.event_code}</p>

      <button onClick={() => navigate(`/event/${event.id}`)}>
        Join Session
      </button>
    </div>
  );
}

export default JoinEventPage;