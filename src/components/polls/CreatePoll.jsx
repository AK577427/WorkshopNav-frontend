import { useState } from "react";
import {createPoll} from "../../services/polls";
import { useParams } from "react-router-dom";

function CreatePoll({ onCreatePoll }) {
  const { eventId } = useParams();
  const [isOpen, setIsOpen] = useState(false);
  const [question, setQuestion] = useState("");
  const [optionOne, setOptionOne] = useState("");
  const [optionTwo, setOptionTwo] = useState("");
  const [optionThree, setOptionThree] = useState("");
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();

    if (!question || !optionOne || !optionTwo || !optionThree) {
      setErr("Please fill in all fields.");
      return;
    }

    try {
      setLoading(true);

      const newPoll = await createPoll(eventId, {
        question: question,
        options: [optionOne, optionTwo, optionThree],
      });

      setQuestion("");
      setOptionOne("");
      setOptionTwo("");
      setOptionThree("");
      setIsOpen(false);
      onCreatePoll(newPoll);
      setLoading(false);

    } catch (error) {
      console.error("Error creating poll:", error);
      setLoading(false);
    }
  }

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
        <form className="poll-form" onSubmit={handleSubmit}>
          {err && <p className="error-message">{err}</p>}
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

          <input
            value={optionThree}
            onChange={(e) => setOptionThree(e.target.value)}
            placeholder="Option 3"
          />

          <button type="submit" disabled={loading}>
            {loading ? "Saving..." : "Save Poll"}
          </button>
        </form>
      )}
    </section>
  );
}

export default CreatePoll;