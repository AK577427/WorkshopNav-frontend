import { useState } from "react";
import { submitFeedback } from "../../services/feedback";

function FeedbackForm({ eventId, setError }) {
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [message, setMessage] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();

    if (!rating) {
      setError("Please select a rating before submitting feedback.");
      return;
    }

    try {
      await submitFeedback(eventId, {
        rating,
        comment,
      });

      setMessage("Thanks for your feedback!");
      setRating(0);
      setComment("");
    } catch (err) {
      console.error(err);
      setError("We couldn't submit your feedback. Please try again.");
    }
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