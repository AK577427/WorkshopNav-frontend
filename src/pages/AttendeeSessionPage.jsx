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

  if (isLoading) return <p>Loading session...</p>;

  if (!event) return <p>Event not found</p>;

  return (
    <div>
      <h1>{event.title}</h1>

      <LivePollCard />
      <QuestionForm />
      <QuestionList />
      <GetSlidesCard />
    </div>
  );
}

export default AttendeeSessionPage;