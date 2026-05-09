import { useState } from "react";

function FeedbackForm() {
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [message, setMessage] = useState("");

  function handleSubmit(e) {
    e.preventDefault();

    console.log({
      rating,
      comment,
    });

    setMessage("Thanks for your feedback!");
  }

  return (
    <section className="card">
      <p className="card-label">Your Feedback Matters</p>

      <h2>Please take a moment to share your feedback</h2>

      <form onSubmit={handleSubmit}>
        {/* Star Rating */}
        <div className="star-rating">
          {[1, 2, 3, 4, 5].map((star) => (
            <button
              key={star}
              type="button"
              className={`star-button ${
                rating >= star ? "active" : ""
              }`}
              onClick={() => setRating(star)}
            >
              ★
            </button>
          ))}
        </div>

        {/* Comment */}
        <textarea
          className="textarea"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          placeholder="Additional comments (optional)..."
          rows="5"
        />

        <button className="button-primary">
          Submit Feedback
        </button>

        {message && (
          <p className="success-message">
            {message}
          </p>
        )}
      </form>
    </section>
  );
}

export default FeedbackForm;