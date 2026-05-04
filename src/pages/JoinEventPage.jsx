import { useNavigate } from "react-router-dom";
import "./JoinEventPage.css";

function JoinEventPage() {
  const navigate = useNavigate();

  return (
    <div className="join-container">

      {/* 🔥 NEW HEADER */}
      <div className="join-header">
        <h1 className="app-title">Workshop Navigator</h1>
        <p className="app-subtitle">by Scott Miller</p>
      </div>

      {/* Title */}
      <h2 className="join-title">Welcome</h2>

      {/* QR Placeholder */}
      <div className="qr-box">Scan QR Code</div>

      <p className="join-text">Or tap below to join the session</p>

      {/* Button */}
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