import { useState } from "react";
// import {useParams} from "react-router-dom";
// import { deactivatePoll } from "../../services/polls";

function LivePollCard({pollId, question, options, onDeactivate}) {
  // const { pollId } = useParams();
  const [isOpen, setIsOpen] = useState(false);
  const [ending, setEnding] = useState(false);

  const totalVotes = options.reduce((sum, option) => sum + option.votes, 0);

  async function handleDeactivatePoll() {
    setEnding(true);
    try {
      await onDeactivate(pollId);
    } catch (err) {
      console.error("Failed to end poll", err);
    } finally {    
      setEnding(false);
    }
  }

  return (
    <article className="live-poll-card">
      <button
        className="live-poll-summary"
        onClick={() => setIsOpen(!isOpen)}
      >
        <div className="poll-icon">▥</div>

        <div className="poll-info">
          <h3>{question}</h3>
          <p>{options.length} options · {totalVotes} responses</p>
        </div>

        <span className="active-badge">Active</span>
        <span className={`poll-arrow ${isOpen ? "open" : ""}`}>›</span>
      </button>

      {isOpen && (
        <div className="poll-results">
          {options.map((option) => {
            const percent =
              totalVotes === 0 ? 0 : Math.round((option.votes / totalVotes) * 100);

            return (
              <div className="poll-result-row" key={option.label}>
                <div className="poll-result-label">
                  <span>{option.label}</span>
                  <span>{percent}%</span>
                </div>

                <div className="poll-result-bar">
                  <div
                    className="poll-result-fill"
                    style={{ width: `${percent}%` }}
                  />
                </div>

                <small>{option.votes} votes</small>
              </div>
            );
          })}

        </div>
      )}
      <button
        className= "delete-poll-button"
        onClick = {handleDeactivatePoll}
        disabled={ending}
        >
          {ending ? "Ending..." : "End Poll"}
      </button>
    </article>
  );
}

export default LivePollCard;