import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getEventByCode } from "../services/events";
import { useNavigate } from "react-router-dom";

// Interactive attendee event components
import QuestionForm from "../components/questions/QuestionForm";
import EmailCaptureForm from "../components/email/EmailCaptureForm";
import Footer from "../components/shared/Footer";
import QuestionList from "../components/questions/QuestionList";
import AttendeePollCard from "../components/polls/AttendeePollCard";
import EventCompletePage from "./EventCompletePage";

function AttendeeEventPage() {
  const { eventCode } = useParams();
  const navigate = useNavigate();

  // State management
  const [event, setEvent] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [err, setErr] = useState("");
  const [refresh, setRefresh] = useState(false);

  // Check if event is active
  const eventIsActive = event?.is_active === true;

  // Load event data from API
  async function loadEvent() {
    try {
      const data = await getEventByCode(eventCode);
      setEvent(data);
      setErr("");
    } catch (err) {
      console.err(err);
      setErr("Unable to load this event right now.");
    } finally {
      setIsLoading(false);
    }
  }

  // ✅ FIXED: Load event on mount and set up auto-refresh
  useEffect(() => {
    loadEvent();

    // Refresh event data every 10 seconds
    const interval = setInterval(() => {
      loadEvent();
    }, 10000);

    // Cleanup interval on unmount
    return () => clearInterval(interval);
  }, [eventCode]);

  // Handle question submission
  const handleQuestionSubmitted = () => {
    setRefresh((prev) => !prev);
  };

  // Show loading screen
  if (isLoading) {
    return (
      <main className="loading-screen">
        <div className="card loading-card">
          <div className="loading-spinner"></div>
          <h2>Loading event...</h2>
          <p className="muted">Preparing your live workshop experience</p>
        </div>
      </main>
    );
  }

  // Show error if event not found
  if (!event) {
    return (
      <main className="page">
        <section className="card card-centered">
          <p className="card-label">Event Error</p>
          <h2>Event not found</h2>
          <p className="muted">This workshop event could not be loaded.</p>
          <p className="muted">Please check the event code and try again.</p>
        </section>
      </main>
    );
  }

  // ✅ FIXED: Show complete page if event is not active
  if (!eventIsActive) {
    return <EventCompletePage eventId={event.id} />;
  }

  // Main event page (active event)
  return (
    <>
      {/* Top application header */}
      <header className="app-header">
        <div className="app-header-inner">
          <div className="app-logo"
          onClick={()=> navigate("/")}>Workshop Navigator</div>

          <div className="event-header-actions">
            {eventIsActive && <span className="live-badge">+ Live</span>}
            <span className="event-code-pill">{event.event_code}</span>
          </div>
        </div>
      </header>

      <main className="page event-page">
        {/* Welcome section */}
        <h1>Live Workshop Event</h1>
        <section className="event-welcome card">
          <p className="muted">You have successfully joined the workshop.</p>
          <h1>{event.title}</h1>

          <div className="event-actions-preview">
            <div className="event-action-chip">Ask Questions</div>
            <div className="event-action-chip">Participate in Polls</div>
            <div className="event-action-chip">Access Slides</div>
          </div>
        </section>

        {/* Poll card */}
        <AttendeePollCard eventId={event.id} />

        {/* Question submission form */}
        <QuestionForm eventId={event.id} onSuccess={handleQuestionSubmitted} />

        {/* Error message if any */}
        {err && <p className="error-message">{err}</p>}

        {/* Question list */}
        <QuestionList eventId={event.id} refresh={refresh} />

        {/* Email capture for slides */}
        <EmailCaptureForm eventId={event.id} />
      </main>

      {/* Footer */}
      <Footer />
    </>
  );
}

export default AttendeeEventPage;