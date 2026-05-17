import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getEvents } from "../services/events";

// Interactive attendee session components
import LivePollCard from "../components/polls/AttendeePollCard";
import QuestionForm from "../components/questions/QuestionForm";
import EmailCaptureForm from "../components/email/EmailCaptureForm";
import Footer from "../components/shared/Footer";
import QuestionList from "../components/questions/QuestionList";

function AttendeeSessionPage() {

  // Get event ID from route parameters
  const { eventId } = useParams();

  // Store selected event data
  const [event, setEvent] = useState(null);

  // Track loading state while fetching event
  const [isLoading, setIsLoading] = useState(true);

  // Load event information when page opens
  useEffect(() => {

    async function loadEvent() {
      try {

        // Fetch all available events
        const data = await getEvents();

        // Find event matching URL parameter
        const found = data.find(
          (e) => e.id === Number(eventId)
        );

        // Save matching event into state
        setEvent(found);

      } catch (err) {

        // Log any fetch errors
        console.error(err);

      } finally {

        // Stop loading spinner
        setIsLoading(false);
      }
    }

    loadEvent();

  }, [eventId]);

  // Display loading screen while event data is loading
  if (isLoading) {
    return (
      <main className="loading-screen">
        <div className="card loading-card">

          {/* Animated loading spinner */}
          <div className="loading-spinner"></div>

          <h2>Loading session...</h2>

          <p className="muted">
            Preparing your live workshop experience
          </p>

        </div>
      </main>
    );
  }

  // Display fallback screen if event cannot be found
  if (!event) {
    return (
      <main className="page">
        <section className="card card-centered">

          <h2>Event not found</h2>

          <p className="muted">
            This session could not be loaded.
          </p>

        </section>
      </main>
    );
  }

  return (
    <>
      {/* Top application header */}
      <header className="app-header">
        <div className="app-header-inner">

          {/* Application branding */}
          <div className="app-logo">
            Workshop Navigator
          </div>

          {/* Session status and event code */}
          <div className="session-header-actions">

            {/* Live session indicator */}
            <span className="live-badge">
              + Live
            </span>

            {/* Display attendee event code */}
            <span className="event-code-pill">
              {event.event_code}
            </span>

          </div>
        </div>
      </header>

      <main className="page session-page">

        {/* Welcome section for attendees */}
        <section className="session-welcome">

          <h1>Welcome!</h1>

          <p>You’re now in the session.</p>

          <p className="muted">
            Engage, participate and have a great learning experience.
          </p>

        </section>

        {/* Live polling component */}
        <LivePollCard />

        {/* Question submission form */}
        <QuestionForm />

        {/* Display attendee questions */}
        <QuestionList />

        {/* Email capture for workshop slides */}
        <EmailCaptureForm />
      </main>

      {/* Global application footer */}
      <Footer />

    </>
  );
}

export default AttendeeSessionPage;