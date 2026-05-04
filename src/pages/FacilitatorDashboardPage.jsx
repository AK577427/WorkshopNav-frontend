function FacilitatorDashboardPage() {
  const event = {
    title: "Gen Z Leadership Workshop",
    code: "GENZ2026",
    attendees: 42,
    questions: 8,
    pollResponses: 31,
  };

  return (
    <div style={{ padding: "24px", maxWidth: "900px", margin: "0 auto" }}>
      <h1>Facilitator Dashboard</h1>

      <section style={{ border: "1px solid #ccc", borderRadius: "12px", padding: "20px", marginTop: "20px" }}>
        <h2>{event.title}</h2>
        <p>Event code: {event.code}</p>
      </section>

      <section style={{ display: "grid", gap: "16px", marginTop: "20px" }}>
        <div style={{ border: "1px solid #ccc", borderRadius: "12px", padding: "20px" }}>
          <h3>Attendees</h3>
          <p>{event.attendees}</p>
        </div>

        <div style={{ border: "1px solid #ccc", borderRadius: "12px", padding: "20px" }}>
          <h3>Questions</h3>
          <p>{event.questions}</p>
        </div>

        <div style={{ border: "1px solid #ccc", borderRadius: "12px", padding: "20px" }}>
          <h3>Poll Responses</h3>
          <p>{event.pollResponses}</p>
        </div>
      </section>

      <section style={{ border: "1px solid #ccc", borderRadius: "12px", padding: "20px", marginTop: "20px" }}>
        <h2>Live Questions</h2>
        <p>Questions submitted by attendees will appear here.</p>
      </section>

      <section style={{ border: "1px solid #ccc", borderRadius: "12px", padding: "20px", marginTop: "20px" }}>
        <h2>Poll Results</h2>
        <p>Poll results will appear here.</p>
      </section>
    </div>
  );
}

export default FacilitatorDashboardPage;