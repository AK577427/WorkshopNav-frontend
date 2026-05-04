import { useEffect, useState } from "react";
import "./DashboardPage.css";

function DashboardPage() {
  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    fetch("http://127.0.0.1:8000/questions/")
      .then((response) => response.json())
      .then((data) => setQuestions(data))
      .catch((error) => console.error(error));
  }, []);

  return (
    <div className="dashboard-container">
      {/* Sidebar */}
      <div className="sidebar">
        <h2 className="logo">Workshop Navigator</h2>
        <ul>
          <li className="active">Dashboard</li>
          <li>Polls</li>
          <li>Questions</li>
          <li>Participants</li>
        </ul>
      </div>

      {/* Main Content */}
      <div className="dashboard-main">
        <h1>Dashboard Overview • Live</h1>
        <p style={{ opacity: 0.6, marginBottom: "20px" }}>
          Real-time workshop engagement data
        </p>

        {/* Stats */}
        <div className="stats-grid">
          <div className="card">
            123
            <br />
            <span>Total Participants</span>
          </div>
          <div className="card">
            92
            <br />
            <span>Poll Responses</span>
          </div>
          <div className="card">
            18
            <br />
            <span>Questions Asked</span>
          </div>
          <div className="card">
            76
            <br />
            <span>Emails Collected</span>
          </div>
        </div>

        {/* Content Sections */}
        <div className="content-grid">
          <div className="card large">
            <h3>Live Poll Results</h3>
            <p>Very confident — 42%</p>
            <p>Confident — 31%</p>
            <p>Neutral — 15%</p>
            <p>Not confident — 12%</p>
          </div>

          <div className="card large">
            <h3>Recent Questions</h3>

            {questions.length > 0 ? (
              questions.map((q) => <p key={q.id}>{q.text || q.question}</p>)
            ) : (
              <p>No questions yet</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default DashboardPage;
