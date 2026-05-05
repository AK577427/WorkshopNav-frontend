function FacilitatorDashboardPage() {
  const event = {
    title: "Gen Z Leadership Workshop",
    code: "GENZ2026",
    attendees: 42,
    questions: 8,
    pollResponses: 31,
  };

  return (
    <>
      <header className="app-header">
        <div className="app-header-inner">
          <div className="app-logo">Workshop Navigator</div>
          <div className="event-code">Facilitator View</div>
        </div>
      </header>

      <main className="page">
        <div className="page-header">
          <h1 className="page-title">Facilitator Dashboard</h1>
          <p className="page-subtitle">
            Monitor audience activity and session insights.
          </p>
        </div>

        <section className="card card-centered">
          <p className="card-label">Current event</p>
          <h2>{event.title}</h2>
          <p className="muted">Event code: {event.code}</p>
        </section>

        <section className="dashboard-grid">
          <div className="stat-card">
            <p className="card-label">Attendees</p>
            <h3>{event.attendees}</h3>
          </div>

          <div className="stat-card">
            <p className="card-label">Questions</p>
            <h3>{event.questions}</h3>
          </div>

          <div className="stat-card">
            <p className="card-label">Poll Responses</p>
            <h3>{event.pollResponses}</h3>
          </div>
        </section>

        <section className="card">
          <p className="card-label">Live Q&A</p>
          <h2>Live Questions</h2>
          <p className="muted">Questions submitted by attendees will appear here.</p>
        </section>

        <section className="card">
          <p className="card-label">Poll analytics</p>
          <h2>Poll Results</h2>
          <p className="muted">Poll results will appear here.</p>
        </section>
      </main>
    </>
  );
}

export default FacilitatorDashboardPage;