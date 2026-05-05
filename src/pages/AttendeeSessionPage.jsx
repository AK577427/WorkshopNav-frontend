import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getEvents } from "../services/events";

import LivePollCard from "../components/polls/LivePollCard";
import QuestionForm from "../components/questions/QuestionForm";
import QuestionList from "../components/questions/QuestionList";
import GetSlidesCard from "../components/shared/GetSlidesCard";

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

  if (!event) return <p>Event not found</p>;

  return (
    <>
      <header className="app-header">
        <div className="app-header-inner">
          <div className="app-logo">Workshop Navigator</div>
          <div className="event-code">Code: {event.event_code}</div>
        </div>
      </header>

      <main className="page">
        <div className="page-header">
          <h1 className="page-title">{event.title}</h1>
          <p className="page-subtitle">
            Join the conversation, answer prompts, and ask questions.
          </p>
        </div>

        <LivePollCard />
        <QuestionForm />
        <QuestionList />
        <GetSlidesCard />
      </main>
    </>
  );
}

export default AttendeeSessionPage;