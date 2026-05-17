import { useState } from "react";

function QuestionForm({ setError }) {
  const [question, setQuestion] = useState("");
  const [anonymous, setAnonymous] = useState(true);
  const [message, setMessage] = useState("");

  function handleSubmit(e) {
    e.preventDefault();

    if (!question.trim()) {
      setError("Please enter your question.");
      return;
    }

    console.log({ question, anonymous });
    setMessage("Your question has been submitted.");
    setQuestion("");
  }

  return (
    <section className="card">
      <p className="card-label">Audience Q&A</p>
      <h2>Ask a Question</h2>

      <form onSubmit={handleSubmit}>
        <textarea
          className="textarea"
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          placeholder="Type your question..."
          rows="4"
        />

        <label className="checkbox-label">
          <input
            type="checkbox"
            checked={anonymous}
            onChange={() => setAnonymous(!anonymous)}
          />
          Ask anonymously
        </label>

        <button type="submit" className="button-primary">
          Submit Question
        </button>
        {message && <p className="success-message">{message}</p>}
      </form>
    </section>
  );
}

export default QuestionForm;