import { useState } from "react";

function FeedbackForm() {
  const [rating, setRating] = useState("");
  const [comment, setComment] = useState("");

  function handleSubmit(e) {
    e.preventDefault();

    console.log({ rating, comment });

    setRating("");
    setComment("");
  }

  return (
    <section className="card">
      <p className="card-label">End of session</p>
      <h2>Session Feedback</h2>

      <form onSubmit={handleSubmit}>
        <label className="form-label">Rating</label>

        <select
          className="select"
          value={rating}
          onChange={(e) => setRating(e.target.value)}
        >
          <option value="">Select a rating</option>
          <option value="5">5 - Excellent</option>
          <option value="4">4 - Good</option>
          <option value="3">3 - Average</option>
          <option value="2">2 - Poor</option>
          <option value="1">1 - Very Poor</option>
        </select>

        <textarea
          className="textarea"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          placeholder="Additional feedback..."
          rows="4"
        />

        <button type="submit" className="button-primary">
          Submit Feedback
        </button>
      </form>
    </section>
  );
}

export default FeedbackForm;