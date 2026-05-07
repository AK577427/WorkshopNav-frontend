import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getEvents } from "../services/events";

import LivePollCard from "../components/polls/LivePollCard";
import QuestionForm from "../components/questions/QuestionForm";
import GetSlidesCard from "../components/shared/GetSlidesCard";
import QuestionList from "../components/questions/QuestionList";

function AttendeeSessionPage() {
  const { eventId } = useParams();
  const [event, setEvent] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function loadEvent() {
      try {
        const data = await getEvents();
        const found = data.find((e) => e.id === Number(eventId));
        setEvent(found);
      } catch (err) {
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    }

    loadEvent();
  }, [eventId]);

  if (isLoading) {
    return (
      <main className="loading-screen">
        <div className="card loading-card">
          <div className="loading-spinner"></div>
          <h2>Loading session...</h2>
          <p className="muted">Preparing your live workshop experience</p>
        </div>
      </main>
    );
  }

  if (!event) {
    return (
      <main className="page">
        <section className="card card-centered">
          <h2>Event not found</h2>
          <p className="muted">This session could not be loaded.</p>
        </section>
      </main>
    );
  }

  return (
    <>
      <header className="app-header">
        <div className="app-header-inner">
          <div className="app-logo">Workshop Navigator</div>

          <div className="session-header-actions">
            <span className="live-badge">+ Live</span>
            <span className="event-code-pill">{event.event_code}</span>
          </div>
        </div>
      </header>

      <main className="page session-page">
        <section className="session-welcome">
          <h1>Welcome!</h1>
          <p>You’re now in the session.</p>
          <p className="muted">
            Engage, participate and have a great learning experience.
          </p>
        </section>

        <LivePollCard />
        <QuestionForm />
        <QuestionList />
        <GetSlidesCard />
      </main>
    </>
  );
}

export default AttendeeSessionPage;