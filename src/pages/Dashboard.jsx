import "./DashboardPage.css";

function Dashboard() {
  return (
    <div className="dashboard-container">

      {/* HEADER */}
      <h1 className="dashboard-title">
        Dashboard Overview <span className="live-dot">• Live</span>
      </h1>
      <p className="dashboard-subtitle">
        Real-time workshop engagement data
      </p>

      {/* STATS */}
      <div className="stats-grid">
        <div className="stat-card">
          <h2>123</h2>
          <p>Total Participants</p>
        </div>

        <div className="stat-card">
          <h2>92</h2>
          <p>Poll Responses</p>
        </div>

        <div className="stat-card">
          <h2>18</h2>
          <p>Questions Asked</p>
        </div>

        <div className="stat-card">
          <h2>76</h2>
          <p>Emails Collected</p>
        </div>
      </div>

      {/* POLL CARD */}
      <div className="card">
        <h3>Live Poll Results</h3>

        <div className="poll-bar">
          <span>Very confident</span>
          <div className="bar"><div style={{ width: "42%" }} /></div>
        </div>

        <div className="poll-bar">
          <span>Confident</span>
          <div className="bar"><div style={{ width: "31%" }} /></div>
        </div>

        <div className="poll-bar">
          <span>Neutral</span>
          <div className="bar"><div style={{ width: "15%" }} /></div>
        </div>

        <div className="poll-bar">
          <span>Not confident</span>
          <div className="bar"><div style={{ width: "12%" }} /></div>
        </div>
      </div>

      {/* QUESTIONS CARD */}
      <div className="card">
        <h3>Recent Questions</h3>
        <div className="empty">No questions yet</div>
      </div>

    </div>
  );
}

export default Dashboard;