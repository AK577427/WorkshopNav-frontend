import { useState } from "react";
import { getQuestions, upvoteQuestion } from "../../services/questions";
import { useEffect } from "react";

function QuestionList({ eventId , refresh }) {
  const [questions, setQuestions] = useState([]);
  const [upvoteErr,setUpvoteErr] = useState("");
  const [upvoteErrorId, setUpvoteErrorId] = useState(null);


  useEffect(() => {
    async function fetchQuestions() {
      try {
        setUpvoteErr("");
        const data = await getQuestions(eventId);
        setQuestions(data);
      } catch (err) {
        console.error(err);
      }
    }

    fetchQuestions();

    // Refresh every 5 seconds
    const interval = setInterval(fetchQuestions, 5000);

    return () => clearInterval(interval);
  }, [eventId, refresh]);

  async function handleUpVote(questionId) {
    const upvotedQuestions = JSON.parse(
      sessionStorage.getItem("upvotedQuestions") || "[]"
    );

    // Clear previous error
    setUpvoteErrorId(null);

    if (upvotedQuestions.includes(questionId)) {
      setUpvoteErrorId(questionId);
      // Automatically clear after 3 seconds
      setTimeout(() => {
      setUpvoteErrorId(null);
      }, 3000);

      return;
    }

    try {
      await upvoteQuestion(questionId);

    // update UI immediately
      setQuestions((prevQuestions) =>
        prevQuestions.map((q) =>
          q.id === questionId
            ? { ...q, upvotes: q.upvotes + 1 }
            : q
        )
      );
    
    // Remember this question was upvoted this session
      sessionStorage.setItem(
      "upvotedQuestions",
      JSON.stringify([...upvotedQuestions, questionId])
      );

        // Remove any previous error after successful upvote
      setUpvoteErrorId(null);

      } catch (err) {
      console.error("Failed to upvote:", err);
      setUpvoteErrorId(questionId);

      setTimeout(() => {
        setUpvoteErrorId(null);
      }, 3000);
      }
    }
  
  return (
    <section className="card">
      <p className="card-label">Live questions</p>
      <h2>Audience Questions</h2>
      <div className="stack">       
        {questions.map((question) => (
          <div key={question.id} className="question-item">
          <div className="question-meta">
              {/* <span>{question.anonymous ? "Anonymous" : {attendee_name}}</span> */}
              <span>{question.question_text} </span>
              <button className="upvote-button" onClick={() => handleUpVote(question.id)}>
                ▲ {question.upvotes}
              </button>            
           </div>
           <span>{question.anonymous ? "Anonymous" : question.attendee_name}</span>
            
          {upvoteErrorId === question.id && (
            <div className="qn-error-message">
              You've already upvoted this question.
            </div>
          )}
        </div>
        ))}
      </div>
    </section>
  );
}

export default QuestionList;