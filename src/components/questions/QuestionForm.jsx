import { useState } from "react";

function QuestionForm() {
  const [question, setQuestion] = useState("");
  const [anonymous, setAnonymous] = useState(true);

  function handleSubmit(e) {
    e.preventDefault();

    if (!question.trim()) {
      alert("Please enter a question");
      return;
    }

    console.log({
      question,
      anonymous,
    });

    setQuestion("");
  }

  return (
    <div
      style={{
        border: "1px solid #ccc",
        borderRadius: "12px",
        padding: "20px",
        maxWidth: "500px",
        margin: "20px auto",
      }}
    >
      <h2>Ask a Question</h2>

      <form onSubmit={handleSubmit}>
        <textarea
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          placeholder="Type your question..."
          rows="4"
          style={{
            width: "100%",
            padding: "12px",
            borderRadius: "8px",
            marginTop: "12px",
            resize: "none",
          }}
        />

        <label
          style={{
            display: "flex",
            gap: "8px",
            marginTop: "12px",
            alignItems: "center",
          }}
        >
          <input
            type="checkbox"
            checked={anonymous}
            onChange={() => setAnonymous(!anonymous)}
          />
          Ask anonymously
        </label>

        <button
          type="submit"
          style={{
            marginTop: "20px",
            width: "100%",
            padding: "12px",
            borderRadius: "8px",
            border: "none",
            background: "#6b46c1",
            color: "white",
            cursor: "pointer",
          }}
        >
          Submit Question
        </button>
      </form>
    </div>
  );
}

export default QuestionForm;