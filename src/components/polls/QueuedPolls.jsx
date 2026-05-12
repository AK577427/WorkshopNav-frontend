function QueuedPolls({ polls, onLaunchPoll }) {
  if (polls.length === 0) {
    return null;
  }

  return (
    <section className="card">
      <div className="section-header">
        <div>
          <h2>Queued Polls</h2>
          <p>Polls ready to send to attendees</p>
        </div>
      </div>

      {polls.map((poll) => (
        <article className="queued-poll-card" key={poll.id}>
          <div className="queued-poll-info">
            <h3>{poll.question}</h3>

            <p>
              {poll.options.length} options · Ready to launch
            </p>
          </div>

          <button
            className="launch-poll-button"
            onClick={() => onLaunchPoll(poll)}
          >
            Launch Now
          </button>
        </article>
      ))}
    </section>
  );
}

export default QueuedPolls;