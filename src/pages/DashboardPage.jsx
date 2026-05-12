import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function DashboardPage() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    async function fetchEvents() {
      try {
        const response = await fetch("http://127.0.0.1:8000/events/", {
          headers: {
            Authorization: `Token ${localStorage.getItem("token")}`,
          },
        });

        const data = await response.json();
        setEvents(data);
      } catch (error) {
        console.error("Error fetching events:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchEvents();
  }, []);

  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <h1>Your Events</h1>
        <p className="dashboard-subtitle">
          Manage your workshop sessions
        </p>
      </div>

      {/* CREATE EVENT BUTTON */}
      <button
        className="button-primary"
        onClick={() => navigate("/dashboard/events/new")}
      >
        + Create New Event
      </button>

      {loading && <p>Loading events...</p>}

      {!loading && events.length === 0 && (
        <p>No events yet</p>
      )}

      {!loading && events.length > 0 && (
        <div>
          {events.map((event) => (
            <div
              key={event.id}
              className="event-card"
              onClick={() => navigate(`/dashboard/events/${event.id}`)}
            >
              <h3>{event.title}</h3>
              <p>Code: {event.event_code}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default DashboardPage;