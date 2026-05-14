function Event({ event, onClick }) {
  return (
    <div className="event-card" onClick={onClick}>
      <h3>{event.title}</h3>

      <p>Code: {event.event_code}</p>
    </div>
  );
}

export default Event;