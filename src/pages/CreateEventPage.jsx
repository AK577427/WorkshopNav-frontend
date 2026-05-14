import { useState } from "react";
import { createEvent } from "../services/events";
import { useNavigate } from "react-router-dom";
import { QRCodeCanvas } from "qrcode.react";

function CreateEventPage() {
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [createdEvent, setCreatedEvent] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();

    if (!title.trim()) {
      alert("Please enter an event title");
      return;
    }

    setIsLoading(true);

    try {
      const data = await createEvent({ title });
      setCreatedEvent(data);
      setTitle("");

      setTimeout(() => {
        navigate("/dashboard");
      }, 2000);
    } catch (err) {
      console.error(err);
      alert("Failed to create event");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <>
      <header className="app-header">
        <div className="app-header-inner">
          <div className="app-logo">Workshop Navigator</div>
        </div>
      </header>

      <main className="page">
        <div className="page-header">
          <h1 className="page-title">Create Event</h1>
          <p className="page-subtitle">Set up a new workshop session</p>
        </div>

        <section className="card">
          <h2>Event Details</h2>

          <form onSubmit={handleSubmit}>
            <label className="form-label">Event Title</label>

            <input
              className="input"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g. Gen Z Leadership Workshop"
            />

            <button className="button-primary" type="submit">
              {isLoading ? "Creating..." : "Create Event"}
            </button>
          </form>
        </section>

        {createdEvent && (
          <section className="card card-centered">
            <p className="card-label">Event created</p>

            <h2>{createdEvent.title}</h2>

            <p className="muted">Event Code</p>
            <h2>{createdEvent.event_code}</h2>

            <p className="muted" style={{ marginTop: "16px" }}>
              Share this link
            </p>

            <div className="share-link">
              {`${window.location.origin}/join/${createdEvent.event_code}`}
            </div>

            <button
              className="button-primary"
              onClick={() => {
                navigator.clipboard.writeText(
                  `${window.location.origin}/join/${createdEvent.event_code}`,
                );
                alert("Link copied!");
              }}
            >
              Copy Link
            </button>

            <div style={{ marginTop: "20px" }}>
              <QRCodeCanvas
                value={`${window.location.origin}/join/${createdEvent.event_code}`}
                size={180}
                bgColor="#ffffff"
                fgColor="#000000"
              />
            </div>
          </section>
        )}
      </main>
    </>
  );
}

export default CreateEventPage;
