<<<<<<< HEAD
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Event from "../components/shared/Event";

function DashboardPage() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();
=======
import { useState } from "react";
import "./DashboardPage.css";

function DashboardPage() {
  const [eventTitle, setEventTitle] = useState("");

  const events = [
    {
      id: 1,
      title: "Gen Z Leadership Workshop",
      date: "May 22, 2026 • 10:00 AM",
      status: "Live",
    },
    {
      id: 2,
      title: "AI for Beginners",
      date: "May 15, 2026 • 02:00 PM",
      status: "Completed",
    },
    {
      id: 3,
      title: "Future of Work",
      date: "May 10, 2026 • 11:00 AM",
      status: "Completed",
    },
  ];

  const handleCreateEvent = () => {
    if (!eventTitle.trim()) return;

    alert(`Event Created: ${eventTitle}`);

    setEventTitle("");
  };

  return (
    <div className="dashboard-container">
>>>>>>> 9c6b4bd (Update dashboard UI and inline event creation flow)

  useEffect(() => {
    async function fetchEvents() {
      try {
        const response = await fetch("http://127.0.0.1:8000/events/", {
          headers: {
            Authorization: `Token ${localStorage.getItem("token")}`,
          },
        });

<<<<<<< HEAD
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

    <div className="dashboard-title">
      <h1>Your Events</h1>

      <p>
        Manage your workshop sessions
      </p>
    </div>
    
      {/* CREATE EVENT BUTTON */}
      <button
        className="create-button"
        onClick={() => navigate("/dashboard/events/new")}
      >
        + Create New Event
      </button>

      {loading && <p>Loading events...</p>}

      {!loading && events.length === 0 && (
        <p>No events yet</p>
      )}

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
=======
        <div className="facilitator">
          <span>Facilitator</span>
        </div>
      </header>

      {/* TITLE */}
      <div className="dashboard-title">
        <h1>Dashboard</h1>
        <p>Manage your workshops and events</p>
      </div>

      {/* CREATE EVENT */}
      <div className="create-event-card">

        <h3>Create New Event</h3>

        <input
          type="text"
          placeholder="Enter event title"
          value={eventTitle}
          onChange={(e) => setEventTitle(e.target.value)}
          className="event-input"
        />

        <button
          className="create-button"
          onClick={handleCreateEvent}
        >
          Create Event
        </button>

      </div>

      {/* EVENTS */}
      <h3 className="section-title">Your Events</h3>

      {events.map((event) => (
        <div className="event-card" key={event.id}>

          <div>
            <h4>{event.title}</h4>
            <p>{event.date}</p>
          </div>

          <span className={`status ${event.status.toLowerCase()}`}>
            {event.status}
          </span>

        </div>
      ))}

>>>>>>> 9c6b4bd (Update dashboard UI and inline event creation flow)
    </div>
  );
}

export default DashboardPage;