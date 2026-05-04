import { useNavigate } from "react-router-dom";
import "./JoinEventPage.css";

function JoinEventPage() {
  const navigate = useNavigate();

  return (
    <div className="join-container">
      <h1 className="join-title">Workshop Navigator</h1>

      <div className="qr-box">
        <p>Scan QR Code</p>
      </div>

      <p className="join-text">
        Or tap below to join the session
      </p>

      <button
        className="join-button"
        onClick={() => navigate("/session")}
      >
        Join Session
      </button>
    </div>
  );
}

export default JoinEventPage;