import { useState } from "react";

function LivePollCard() {
  const [selectedOption, setSelectedOption] = useState("");

  const poll = {
    question: "What is your biggest challenge with Gen Z employees?",
    options: [
      "Communication",
      "Motivation",
      "Retention",
      "Conflict",
    ],
  };

  function handleSubmit() {
    if (!selectedOption) {
      alert("Please select an option");
      return;
    }

    console.log("Submitted:", selectedOption);
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
      <h2>{poll.question}</h2>

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "10px",
          marginTop: "20px",
        }}
      >
        {poll.options.map((option) => (
          <button
            key={option}
            onClick={() => setSelectedOption(option)}
            style={{
              padding: "12px",
              borderRadius: "8px",
              border:
                selectedOption === option
                  ? "2px solid purple"
                  : "1px solid #ccc",
              background:
                selectedOption === option ? "#f3e8ff" : "white",
              cursor: "pointer",
            }}
          >
            {option}
          </button>
        ))}
      </div>

      <button
        onClick={handleSubmit}
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
        Submit Response
      </button>
    </div>
  );
}

export default LivePollCard;