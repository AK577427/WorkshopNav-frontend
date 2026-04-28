import { useState } from "react";

function FeedbackForm() {
  const [rating, setRating] = useState("");
  const [comment, setComment] = useState("");

  function handleSubmit(e) {
    e.preventDefault();

    console.log({
      rating,
      comment,
    });

    setRating("");
    setComment("");
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
      <h2>Session Feedback</h2>

      <form onSubmit={handleSubmit}>
        <label
          style={{
            display: "block",
            marginTop: "12px",
          }}
        >
          Rating
        </label>

        <select
          value={rating}
          onChange={(e) => setRating(e.target.value)}
          style={{
            width: "100%",
            padding: "12px",
            borderRadius: "8px",
            marginTop: "8px",
          }}
        >
          <option value="">Select a rating</option>
          <option value="5">5 - Excellent</option>
          <option value="4">4 - Good</option>
          <option value="3">3 - Average</option>
          <option value="2">2 - Poor</option>
          <option value="1">1 - Very Poor</option>
        </select>

        <textarea
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          placeholder="Additional feedback..."
          rows="4"
          style={{
            width: "100%",
            padding: "12px",
            borderRadius: "8px",
            marginTop: "16px",
            resize: "none",
            boxSizing: "border-box",
          }}
        />

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
          Submit Feedback
        </button>
      </form>
    </div>
  );
}

export default FeedbackForm;