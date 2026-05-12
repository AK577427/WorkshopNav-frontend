<<<<<<< feature/event-details-page
import { useState } from "react";

function CreatePoll({ onCreatePoll }) {
  const [isOpen, setIsOpen] = useState(false);
  const [question, setQuestion] = useState("");
  const [optionOne, setOptionOne] = useState("");
  const [optionTwo, setOptionTwo] = useState("");

  function handleSubmit(e) {
    e.preventDefault();

    if (!question || !optionOne || !optionTwo) {
      return;
    }

    onCreatePoll({
      id: Date.now(),
      eventCode: "AB12CD",
      question,
      options: [optionOne, optionTwo],
      status: "queued",
    });

    setQuestion("");
    setOptionOne("");
    setOptionTwo("");
    setIsOpen(false);
  }
=======
// src/components/event/CreatePoll.jsx
import { useState } from "react";

function CreatePoll() {
  const [isOpen, setIsOpen] = useState(false);
>>>>>>> main

  return (
    <section className="card">
      <div className="section-header">
        <div>
          <h2>Create Poll</h2>
          <p>Create a new poll for your attendees</p>
        </div>

        <button onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? "Close" : "+ Create Poll"}
        </button>
      </div>

      {isOpen && (
<<<<<<< feature/event-details-page
        <form className="poll-form" onSubmit={handleSubmit}>
          <input
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            placeholder="Poll question"
          />

          <input
            value={optionOne}
            onChange={(e) => setOptionOne(e.target.value)}
            placeholder="Option 1"
          />

          <input
            value={optionTwo}
            onChange={(e) => setOptionTwo(e.target.value)}
            placeholder="Option 2"
          />

=======
        <form className="poll-form">
          <input placeholder="Poll question" />
          <input placeholder="Option 1" />
          <input placeholder="Option 2" />
>>>>>>> main
          <button type="submit">Save Poll</button>
        </form>
      )}
    </section>
  );
}

export default CreatePoll;