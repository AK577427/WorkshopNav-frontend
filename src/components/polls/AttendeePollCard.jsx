import { useState, useEffect } from "react";
import {getPolls, submitPollResponse, getPollResponses} from "../../services/polls";

function AttendeePollCard({eventId}) {

  //poll data
  const [poll, setPoll] = useState(null);
  const [pollOptions, setPollOptions] = useState([]);

  //user interface
  const [selectedOption, setSelectedOption] = useState(null);
  const [hasSubmitted, setHasSubmitted] = useState(false);

  //ui states
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState("");

  //poll results
  const [responses, setResponses] = useState([]);

  // fetch  active poll
  useEffect(() => {
    async function fetchActivePoll(){
      try {
        setLoading(true);
        setErr("");

        //get all polls for this event
        const allPolls = await getPolls(eventId);
        console.log("Fetched polls:", allPolls);
        //find the active poll (assuming only one active poll at a time)
        const activePoll = allPolls.find(poll => poll.is_active===true);

        if (activePoll) {
          console.log("Active poll found:", activePoll);
          setPoll(activePoll);
          setPollOptions(activePoll.poll_options || []);

          const options = activePoll.poll_options || [];
          console.log("Poll options from API:", options);
          
          //fetch responses for this poll
          const pollResponses = await getPollResponses(activePoll.id);
          setResponses(pollResponses || [] );
          setErr("");
        }else{
          setPoll(null);
          setPollOptions([]);
          setResponses([]);
          setErr("No active poll at the moment.");
        }
      } catch (err) {
        console.error("Error fetching poll data:", err);
        setErr("Failed to fetch poll data");
        setPoll(null);
        setPollOptions([]);
        setResponses([]);
        setErr("Failed to fetch poll data");
      } finally {
        setLoading(false);
      }
    }

    fetchActivePoll();

    const interval = setInterval(fetchActivePoll, 15000); // Refresh poll data every 15 seconds
    return () => clearInterval(interval); // Clean up interval on component unmount

  }, [eventId]);

  //handle poll submission
  async function handleSubmit(e) {
    e.preventDefault();

    if (!selectedOption) {
      setErr("Please select an answer");
      return;
    }
    try {
      setLoading(true);
      setErr("");
      await submitPollResponse(poll.id,  { option: selectedOption } );

      setHasSubmitted(true);
      }catch (err) {
      console.error("Error submitting poll response:", err);
      setErr("Failed to submit your response. Please try again.");
      } finally {
      setLoading(false);
      }
  }

  //count responses for each option
  const getOptionVoteCount = (optionId) => {
    return responses.filter((response) => response.option === optionId).length;
  };


  //calculate total responses for percentage calculation
  const getOptionPercentage = (optionId) => {
    const totalResponses  = responses.length;
    if (totalResponses === 0) return 0;
    const voteCount = getOptionVoteCount(optionId);
    return Math.round((voteCount / totalResponses) * 100);
  };

  //Loading state
  if (loading && !poll) {
     return (
    <article className="card attendee-poll-card">
      <p className="card-label">LIVE POLL</p>
      <h2>Loading poll...</h2>
    </article>
  );
  }

  const totalResponses  = responses.length;

  return (
    <article className="card attendee-poll-card">
      <p className="card-label">LIVE POLL</p>
      {poll?.question == null?(
        <p className="muted"></p>
      ):(
        <h2>{poll.question}</h2>
      )}
 
      {!hasSubmitted ? (
        <form onSubmit={handleSubmit} className="attendee-poll-form">
          {err && <p className="error-message">{err}</p>}
 
          {pollOptions && pollOptions.length > 0 ? (
            <div className="poll-results">
              {pollOptions.map((option) => {
                const voteCount = getOptionVoteCount(option.id);
                const percentage = getOptionPercentage(option.id);
 
                return (
                  <div key={option.id} className="poll-result-row">
                    <button
                      type="button"
                      className={`option-button-votes ${
                        selectedOption === option.id ? "selected" : ""
                      }`}
                      onClick={() => {
                        setSelectedOption(option.id);
                        setErr("");
                      }}
                      disabled={loading}
                    >
                      <span className="option-text">{option.option_text}</span>
                    </button>
                    
                    {totalResponses > 0 && (
                      <div className="poll-result-bar">
                        <div
                          className="progress-fill"
                          style={{ width: `${percentage}%` }}
                        />
                      </div>

                    )}
                    <div className="poll-result-label">
                      <span>{voteCount} {voteCount === 1 ? "vote" : "votes"}</span>
                      <span>{percentage}%</span>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <p className="muted">No options available.</p>
          )}
          <button 
            className="button-primary" 
            disabled={loading || !poll || (pollOptions && pollOptions.length === 0)}
            type="submit">
            Submit Answer
          </button>
        </form>
      ) : (
        <p className="muted">
          Thanks — your response has been submitted.
        </p>
      )}
    </article>
  );
}

export default AttendeePollCard;