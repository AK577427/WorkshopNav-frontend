import { useState } from "react";

function FeedbackForm() {
  const [feedback, setFeedback] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!feedback) {
      alert("Please enter feedback");
      return;
    }

    console.log("Feedback:", feedback);

    setSubmitted(true);
    setFeedback("");

    setTimeout(() => setSubmitted(false), 3000);
  };

  return (
    <div>
      <h4>Feedback</h4>

      {submitted ? (
        <p style={{ color: "lightgreen" }}>✅ Feedback sent!</p>
      ) : (
        <form onSubmit={handleSubmit}>
          <textarea
            placeholder="Write your feedback..."
            value={feedback}
            onChange={(e) => setFeedback(e.target.value)}
            rows="3"
            style={{
              width: "100%",
              padding: "10px",
              borderRadius: "6px",
              border: "none",
              marginBottom: "10px",
            }}
          />
          <button type="submit">Send Feedback</button>
        </form>
      )}
    </div>
  );
}

export default FeedbackForm;