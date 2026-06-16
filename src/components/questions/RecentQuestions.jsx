import { useState } from "react";
import { getQuestions } from "../../services/questions";
import { useEffect } from "react";

function RecentQuestions({ eventId , refresh }) {
  const [questions, setQuestions] = useState([]);


  useEffect(() => {
    async function fetchQuestions() {
      try {
        const data = await getQuestions(eventId);
        setQuestions(data);
      } catch (err) {
        console.error(err);
      }
    }

    fetchQuestions();

        // refresh every 10 seconds
    const interval = setInterval(fetchQuestions, 10 * 1000);
 
    // clear on unmount or when eventId / refresh changes
    return () => clearInterval(interval);
  }, [eventId, refresh]);

  return (
    <section className="card">
      <p className="card-label">Live questions</p>
      <h2>Recent Questions from Attendees</h2>

      <div className="stack">
        {questions.map((question) => (
          <div key={question.id} className="question-item">
            <p>{question.question_text}</p>
            <div>
            <span> votes</span>
            <span className="votes">{question.upvotes}</span>
            </div>
            
         </div>
        ))}
      </div>
    </section>
  );
}

export default RecentQuestions;