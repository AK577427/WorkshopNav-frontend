import { useState } from "react";

function LivePollCard() {
  const [selectedOption, setSelectedOption] = useState("");
  const [message, setMessage] = useState("");

  const poll = {
    question: "What is your biggest challenge with Gen Z employees?",
    options: ["Communication", "Motivation", "Retention", "Conflict"],
  };

  function handleSubmit() {
    if (!selectedOption) {
      alert("Please select an option");
      return;
    }

    console.log("Submitted:", selectedOption);
    setMessage("Your poll response has been submitted.");
  }

  return (
    <section className="card">
      <p className="card-label">Live poll</p>
      <h2>{poll.question}</h2>

      <div className="stack">
        {poll.options.map((option) => (
          <button
            key={option}
            onClick={() => setSelectedOption(option)}
            className={`option-button ${selectedOption === option ? "selected" : ""}`}
          >
            {option}
          </button>
        ))}
      </div>

      <button onClick={handleSubmit} className="button-primary">
        Submit Response
      </button>
      {message && <p className="success-message">{message}</p>}
    </section>
  );
}

export default LivePollCard;