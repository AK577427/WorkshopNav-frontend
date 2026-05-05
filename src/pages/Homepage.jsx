import { useState } from "react";
import { useNavigate } from "react-router-dom";

function HomePage() {
  const [code, setCode] = useState("");
  const navigate = useNavigate();

  function handleJoin(e) {
    e.preventDefault();

    if (!code.trim()) {
      alert("Enter a code");
      return;
    }

    navigate(`/join/${code}`);
  }

  return (
    <>
      {/* Header */}
      <header className="app-header">
        <div className="app-header-inner">
          <div className="app-logo">Workshop Navigator</div>

          <button
            className="organiser-link"
            onClick={() => navigate("/dashboard/events/new")}
          >
            Event Organiser
          </button>
        </div>
      </header>

      {/* Landing */}
      <main className="page landing">
        <div className="landing-content">
          <h1 className="landing-title">Join a Workshop</h1>
          <p className="landing-subtitle">
            Enter your event code to participate
          </p>

          <form onSubmit={handleJoin} className="landing-form">
            <input
              className="input landing-input"
              value={code}
              onChange={(e) =>
                setCode(e.target.value.toUpperCase())
              }
              placeholder="Enter event code (e.g. 015B9F)"
            />

            <button className="button-primary">
              Join Session
            </button>
          </form>
        </div>
      </main>
    </>
  );
}

export default HomePage;