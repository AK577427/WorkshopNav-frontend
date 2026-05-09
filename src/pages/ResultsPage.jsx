import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

function ResultsPage() {
  // Mock data (replace later with API)
  const pollResults = [
    { option: "Communication", votes: 12 },
    { option: "Motivation", votes: 8 },
    { option: "Retention", votes: 6 },
    { option: "Conflict", votes: 5 },
  ];

  const questions = [
    "How do you improve Gen Z engagement?",
    "What leadership styles work best?",
  ];

  const attendeeCount = 42;
  const emailCount = 18;
  const pollResponseCount = 31;
  const averageRating = 4.2;

  function exportCSV() {
    let csv = "Session Summary\n";
    csv += `Attendees,${attendeeCount}\n`;
    csv += `Poll Responses,${pollResponseCount}\n`;
    csv += `Questions,${questions.length}\n`;
    csv += `Emails Captured,${emailCount}\n`;
    csv += `Average Rating,${averageRating}\n\n`;

    csv += "Poll Results\nOption,Votes\n";
    pollResults.forEach((row) => {
      csv += `${row.option},${row.votes}\n`;
    });

    csv += "\nQuestions\n";
    questions.forEach((q) => {
      csv += `${q}\n`;
    });

    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = "session-results.csv";
    a.click();
  }

  return (
    <>
      {/* Header */}
      <header className="app-header">
        <div className="app-header-inner">
          <div className="app-logo">Workshop Navigator</div>
          <div className="event-code">Results</div>
        </div>
      </header>

      <main className="page">
        <div className="page-header">
          <h1 className="page-title">Session Results</h1>
          <p className="page-subtitle">
            Summary of audience engagement and insights
          </p>
        </div>

        {/* Summary */}
        <section className="card">
          <p className="card-label">Summary</p>
          <h2>Session Overview</h2>

          <div className="stack">
            <div className="result-row">
              <span>Attendees</span>
              <span>{attendeeCount}</span>
            </div>

            <div className="result-row">
              <span>Poll Responses</span>
              <span>{pollResponseCount}</span>
            </div>

            <div className="result-row">
              <span>Questions</span>
              <span>{questions.length}</span>
            </div>

            <div className="result-row">
              <span>Emails Captured</span>
              <span>{emailCount}</span>
            </div>

            <div className="result-row">
              <span>Average Rating</span>
              <span>{averageRating} / 5</span>
            </div>
          </div>
        </section>

        {/* Poll Graph */}
        <section className="card">
          <p className="card-label">Poll Results</p>
          <h2>Audience Responses</h2>

          <div style={{ width: "100%", height: 300 }}>
            <ResponsiveContainer>
              <BarChart data={pollResults}>
                <XAxis dataKey="option" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="votes" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </section>

        {/* All Questions */}
        <section className="card">
          <p className="card-label">Questions</p>
          <h2>All Questions</h2>

          <div className="stack">
            {questions.length === 0 ? (
              <p className="muted">No questions submitted yet</p>
            ) : (
              questions.map((q, i) => (
                <div key={i} className="question-item">
                  {q}
                </div>
              ))
            )}
          </div>
        </section>

        {/* Export */}
        <section className="card card-centered">
          <p className="card-label">Export</p>
          <h2>Download Results</h2>

          <button className="button-primary" onClick={exportCSV}>
            Export CSV
          </button>
        </section>
      </main>
    </>
  );
}

export default ResultsPage;