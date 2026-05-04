import LivePollCard from "../components/polls/LivePollCard";
import QuestionForm from "../components/questions/QuestionForm";
import QuestionList from "../components/questions/QuestionList";
import GetSlidesCard from "../components/shared/GetSlidesCard";

function AttendeeSessionPage() {
  return (
    <div>
      <h1>Live Session</h1>
      <LivePollCard />
      <QuestionForm />
      <QuestionList />
      <GetSlidesCard />
    </div>
  );
}

export default AttendeeSessionPage;