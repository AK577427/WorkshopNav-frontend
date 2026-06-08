import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Event from "../components/shared/Event";
import "./DashboardPage.css";
import { getEventsPerFacilitator } from "../services/events";
import LogoutButton from "../components/shared/LogoutButton";
import Footer from "../components/shared/Footer";

function DashboardPage() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState("");

  const navigate = useNavigate();

  // (eventIsActive will be determined per event inside the map)


  useEffect(() => {
    async function fetchEvents() {
      try {
        const data = await getEventsPerFacilitator();
        setEvents(data);
        setErr("");
      } catch (err) {
        console.err("Error fetching events:", err);
        setErr("Failed to fetch events.");  
      } finally {
        setLoading(false);
      }
    }
    fetchEvents();
  }, []);

  // // ✅ FIXED: Load event on mount and set up auto-refresh
  // useEffect(() => {
  //   fetchEvents();

  //   // Refresh event data every 10 seconds
  //   const interval = setInterval(() => {
  //     fetchEvents();
  //   }, 10000);

  //   // Cleanup interval on unmount
  //   return () => clearInterval(interval);
  // }, []);

  return (
    <>
    <header className="app-header">
        <div className="app-header-inner">
          {/* Application branding */}
          <div className="app-logo" 
          onClick={()=> navigate("/")}>
            Workshop Navigator
          </div>

          {/* Organiser account actions */}
          <div className="header-actions">
            <LogoutButton />
          </div>
        </div>
      </header>
      <div className="dashboard-container">
        <div className="dashboard-title">
          <h1>Manage your Events</h1>
        </div>

        {/* CREATE EVENT BUTTON */}
        <button
          className="create-button"
          onClick={() => navigate("/dashboard/events/new")}
        >
          + Create New Event
        </button>

        {loading && (
          <div className="card card-centered">
            <div className="loading-spinner"></div>

            <p className="muted">Loading your workshop events...</p>
          </div>
        )}
        {!loading && err && <p className="error">{err}</p>} 
        {!loading && events.length === 0 && <p>No events yet</p>}


        {!loading && events.length > 0 && (
          <section className="card">
            <div className="events-list">
              <h2>Existing Events</h2>
              <p>Here you can view and manage all the events you've created. Click on an event to see more details, edit it, or view results.</p>

              {events.map((event) => (
                <div key={event.id} className="event-item">
                  <span className={event?.is_active ? "active-badge" : "inactive-badge"}>
                    {event?.is_active ? "Active" : "Completed"}
                  </span>                 

                  <Event
                    event={event}
                    onClick={() => navigate(`/dashboard/events/${event.id}`)}
                  />
                </div>
              ))}
            </div>
          </section>
        )}

      </div>

    <Footer />
    </>
  );
}

export default DashboardPage;
