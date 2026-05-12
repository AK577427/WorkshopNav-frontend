import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Event from "../components/shared/Event";
import "./DashboardPage.css";

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

      {/* LOADING */}
      {loading && <p>Loading events...</p>}

      {/* NO EVENTS */}
      {!loading && events.length === 0 && (
        <p>No events yet</p>
      )}

      {/* EVENT LIST */}
      {!loading && events.length > 0 && (
        <div className="events-list">
          {events.map((event) => (
            <Event
              key={event.id}
              event={event}
              onClick={() =>
                navigate(`/dashboard/events/${event.id}`)
              }
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default DashboardPage;