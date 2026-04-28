import LivePollCard from "../components/polls/LivePollCard";
import QuestionForm from "../components/questions/QuestionForm";
import QuestionList from "../components/questions/QuestionList";

function AttendeeSessionPage() {
  return (
    <div>
      <h1>Live Session</h1>
      <LivePollCard />
      <QuestionForm />
      <QuestionList />
    </div>
  );
}

export default AttendeeSessionPage;