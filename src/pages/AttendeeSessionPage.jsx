import LivePollCard from "../components/polls/LivePollCard";
import QuestionForm from "../components/questions/QuestionForm";

function AttendeeSessionPage() {
  return (
    <div>
      <h1>Live Session</h1>
      <LivePollCard />
      <QuestionForm />
    </div>
  );
}

export default AttendeeSessionPage;