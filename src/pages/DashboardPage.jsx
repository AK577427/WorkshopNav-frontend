import { useEffect, useState } from "react";

function DashboardPage() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

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
      {/* HEADER */}
      <div className="dashboard-header">
        <h1>Your Events</h1>
        <p className="dashboard-subtitle">
          Manage your workshop sessions
        </p>
      </div>

      {/* LOADING */}
      {loading && <p>Loading events...</p>}

      {/* NO EVENTS */}
      {!loading && events.length === 0 && (
        <p>No events yet</p>
      )}

      {/* EVENT LIST */}
      {!loading && events.length > 0 && (
        <div>
          {events.map((event) => (
            <div key={event.id} className="event-card">
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