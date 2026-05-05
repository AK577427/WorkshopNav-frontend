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

  if (isLoading) {
    return (
      <main className="loading-screen">
        <div className="card loading-card">
          <div className="loading-spinner"></div>
          <h2>Loading event...</h2>
          <p className="muted">Getting your workshop ready</p>
        </div>
      </main>
    );
  }

  if (error) {
    return (
      <main className="page">
        <div className="card">
          <h2>Event not found</h2>
          <p className="muted">{error}</p>
        </div>
      </main>
    );
  }

  return (
    <>
      {/* App Header */}
      <header className="app-header">
        <div className="app-header-inner">
          <div className="app-logo">Workshop Navigator</div>
        </div>
      </header>

      <main className="page">
        <div className="page-header">
          <h1 className="page-title">{event.title}</h1>
          <p className="page-subtitle">
            You’re about to join this live workshop session
          </p>
        </div>

        <div className="card card-centered">
          <p className="muted">Event Code</p>
          <h2>{event.event_code}</h2>

          <button
            className="button-primary"
            onClick={() => navigate(`/event/${event.id}`)}
          >
            Join Session
          </button>
        </div>
      </main>
    </>
  );
}

export default JoinEventPage;