import { useState } from "react";

function FeedbackForm() {
  const [feedback, setFeedback] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log("Feedback:", feedback);

    setSubmitted(true);
    setFeedback("");
  };

  return (
    <div style={{ marginTop: "20px" }}>
      <h3>Feedback</h3>

      {submitted ? (
        <p>Thank you for your feedback!</p>
      ) : (
        <form onSubmit={handleSubmit}>
          <textarea
            placeholder="Enter your feedback"
            value={feedback}
            onChange={(e) => setFeedback(e.target.value)}
            required
            rows="4"
            style={{
              width: "100%",
              padding: "10px",
              borderRadius: "6px",
              border: "none",
              marginBottom: "10px",
            }}
          />

          <button
            type="submit"
            style={{
              padding: "10px 15px",
              background: "#5b5bd6",
              color: "white",
              border: "none",
              borderRadius: "6px",
              cursor: "pointer",
            }}
          >
            Submit
          </button>
        </form>
      )}
    </div>
  );
}

export default FeedbackForm;