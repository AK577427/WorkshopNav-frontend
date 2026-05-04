import { useState } from "react";
import "./AskQuestion.css";

function AskQuestion() {
  const [question, setQuestion] = useState("");
  const [anonymous, setAnonymous] = useState(true);

  return (
    <div className="ask-container">
      <h1 className="ask-title">Ask a Question</h1>

      <textarea
        className="ask-input"
        placeholder="Type your question here..."
        value={question}
        onChange={(e) => setQuestion(e.target.value)}
      />

      <div className="toggle-row">
        <label>Ask anonymously</label>
        <input
          type="checkbox"
          checked={anonymous}
          onChange={() => setAnonymous(!anonymous)}
        />
      </div>

      <button className="submit-button">Submit Question</button>
    </div>
  );
}

export default AskQuestion;