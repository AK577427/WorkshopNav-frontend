import { useNavigate } from "react-router-dom";
import "./SessionHome.css";

function SessionHome() {
  const navigate = useNavigate();

  return (
    <div className="session-container">
      <h1 className="session-title">Workshop Title</h1>
      <p className="session-subtitle">Welcome to today’s session</p>

      <div className="button-group">
        <button
          className="main-button"
          onClick={() => navigate("/ask")}
        >
          ASK A QUESTION
        </button>

        <button className="main-button">
          VOTE IN POLL
        </button>

        <button
          className="main-button"
          onClick={() => navigate("/slides")}
        >
          GET THE SLIDES
        </button>
      </div>

      <button className="leave-button">Leave Session</button>
    </div>
  );
}

export default SessionHome;