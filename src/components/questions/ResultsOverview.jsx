// src/components/event/ResultsOverview.jsx
function ResultsOverview() {
  return (
    <section className="card">
      <div className="section-header">
        <h2>Quick Results Overview</h2>
      </div>

      <div className="results-grid">
        <div>
          <strong>2</strong>
          <p>Active Polls</p>
        </div>

        <div>
          <strong>77</strong>
          <p>Total Responses</p>
        </div>

        <div>
          <strong>12</strong>
          <p>Questions</p>
        </div>
      </div>
    </section>
  );
}

export default ResultsOverview;