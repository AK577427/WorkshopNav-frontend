import { useState, useEffect } from "react";
import { submitPollResponse, getPollResponses } from "../../services/polls";

function AttendeePollCard({ poll }) {
  const pollOptions = poll.poll_options || [];
  const storageKey = `voted_poll_${poll.id}`;

  const [selectedOption, setSelectedOption] = useState(null);
  const [hasSubmitted, setHasSubmitted] = useState(
    () => localStorage.getItem(storageKey) === "true"
  );
  const [responses, setResponses] = useState([]);
  const [submitting, setSubmitting] = useState(false);
  const [err, setErr] = useState("");

  // Keep results live (every 10s)
  useEffect(() => {
    let cancelled = false;

    async function fetchResponses() {
      try {
        const data = await getPollResponses(poll.id);
        if (!cancelled) setResponses(data || []);
      } catch (e) {
        console.error("Error fetching responses:", e);
      }
    }

    fetchResponses();
    const interval = setInterval(fetchResponses, 10000);
    return () => {
      cancelled = true;
      clearInterval(interval);
    };
  }, [poll.id]);

  async function handleSubmit(e) {
    e.preventDefault();
    if (!selectedOption) {
      setErr("Please select an answer");
      return;
    }
    try {
      setSubmitting(true);
      setErr("");
      await submitPollResponse(poll.id, { option: selectedOption });
      setHasSubmitted(true);
      localStorage.setItem(storageKey, "true"); // survives a page refresh
      const data = await getPollResponses(poll.id); // show their vote immediately
      setResponses(data || []);
    } catch (e) {
      console.error("Error submitting poll response:", e);
      setErr("Failed to submit your response. Please try again.");
    } finally {
      setSubmitting(false);
    }
  }

  const totalResponses = responses.length;
  const voteCount = (id) => responses.filter((r) => r.option === id).length;
  const percentage = (id) =>
    totalResponses === 0 ? 0 : Math.round((voteCount(id) / totalResponses) * 100);

  return (
    <article className="card attendee-poll-card">
      <p className="card-label">LIVE POLL</p>
      <h2>{poll.question}</h2>

      {err && <p className="error-message">{err}</p>}

      {hasSubmitted ? (
        // Results-only view — no voting allowed
        <div className="poll-results">
          {pollOptions.map((option) => (
            <div key={option.id} className="poll-result-row">
              <div className="poll-result-label">
                <span>{option.option_text}</span>
                <span>{percentage(option.id)}%</span>
              </div>
              <div className="poll-result-bar">
                <div
                  className="progress-fill"
                  style={{ width: `${percentage(option.id)}%` }}
                />
              </div>
              <small>
                {voteCount(option.id)} {voteCount(option.id) === 1 ? "vote" : "votes"}
              </small>
            </div>
          ))}
          <p className="muted">Thanks — your response has been submitted.</p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="attendee-poll-form">
          {pollOptions.length > 0 ? (
            <div className="poll-results">
              {pollOptions.map((option) => (
                <button
                  key={option.id}
                  type="button"
                  className={`option-button-votes ${
                    selectedOption === option.id ? "selected" : ""
                  }`}
                  onClick={() => {
                    setSelectedOption(option.id);
                    setErr("");
                  }}
                  disabled={submitting}
                >
                  <span className="option-text">{option.option_text}</span>
                </button>
              ))}
            </div>
          ) : (
            <p className="muted">No options available.</p>
          )}

          <button
            className="button-primary"
            disabled={submitting || pollOptions.length === 0}
            type="submit"
          >
            {submitting ? "Submitting…" : "Submit Answer"}
          </button>
        </form>
      )}
    </article>
  );
}

export default AttendeePollCard;