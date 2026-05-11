// src/components/event/CreatePoll.jsx
import { useState } from "react";

function CreatePoll() {
  const [isOpen, setIsOpen] = useState(false);

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
        <form className="poll-form">
          <input placeholder="Poll question" />
          <input placeholder="Option 1" />
          <input placeholder="Option 2" />
          <button type="submit">Save Poll</button>
        </form>
      )}
    </section>
  );
}

export default CreatePoll;