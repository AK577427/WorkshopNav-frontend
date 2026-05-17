import { useEffect, useState } from "react";
import { getEventById } from "../services/events";
import "./DashboardPage.css";
import Footer from "../components/shared/Footer";
import { useParams, useNavigate } from "react-router-dom";

function EventDetailsPage() {
  const { eventCode } = useParams();
  const navigate = useNavigate();

  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchEvent() {
      try {
        const data = await getEventById(eventCode);
        setEvent(data);
      } catch (error) {
        console.error("Error fetching event:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchEvent();
  }, [eventCode]);

  if (loading) {
    return (
      <div className="dashboard-page">
        <p>Loading workshop details...</p>
      </div>
    );
  }

  if (!event) {
    return (
      <div className="dashboard-page">
        <p>Event not found.</p>
      </div>
    );
  }

  return (
    <>
      <header className="dashboard-header">
        <div className="dashboard-header-inner">
          <div>
            <p className="dashboard-label">Workshop Navigator</p>

            <h1 className="dashboard-title">{event.title}</h1>

            <p className="dashboard-subtitle">Current live workshop event</p>
          </div>

          <div className="live-badge">LIVE</div>
        </div>
      </header>

      <main className="dashboard-page">
        {/* EVENT INFO */}
        <section className="dashboard-card overview-card">
          <div>
            <p className="card-label">Event Code</p>

            <h2 className="event-code-text">{event.event_code}</h2>
          </div>

          <p className="event-time">
            {event.created_at
              ? new Date(event.created_at).toLocaleString()
              : "Workshop event"}
          </p>
        </section>

        {/* STATS */}
        <section className="stats-grid">
          <div className="stat-card">
            <h2>42</h2>
            <p>Participants</p>
          </div>

          <div className="stat-card">
            <h2>77</h2>
            <p>Responses</p>
          </div>

          <div className="stat-card">
            <h2>12</h2>
            <p>Questions</p>
          </div>
        </section>

        {/* FACILITATOR ACTIONS */}
        <section className="dashboard-card">
          <p className="card-label">Facilitator Actions</p>

          <div className="action-buttons">
            <button
              className="primary-button"
              onClick={() => navigate(`/results/${eventId}`)}
            >
              View Results
            </button>

            <button
              className="secondary-button"
              onClick={() => navigate("/dashboard")}
            >
              Back to Dashboard
            </button>
          </div>
        </section>

        {/* ACTIVE POLL */}
        <section className="dashboard-card">
          <p className="card-label">Active Poll</p>

          <h3 className="poll-title">How valuable is today’s workshop?</h3>

          <div className="poll-bar">
            <div className="poll-fill" style={{ width: "82%" }}></div>
          </div>

          <p className="poll-result">82% Positive Feedback</p>
        </section>

        {/* QUESTIONS */}
        <section className="dashboard-card">
          <p className="card-label">Recent Questions</p>

          <div className="question-list">
            <div className="question-card">
              Can you share more examples of real-world leadership challenges?
            </div>

            <div className="question-card">
              What tools help build effective teams?
            </div>
          </div>
        </section>

        {/* EXPORT */}
        <section className="dashboard-card">
          <button className="secondary-button">Export Results CSV</button>
        </section>
      </main>
      <Footer />
    </>
  );
}

export default EventDetailsPage;
