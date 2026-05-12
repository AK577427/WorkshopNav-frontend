import { useState } from "react";
import { createEvent } from "../services/events";
import { useNavigate } from "react-router-dom";

// QR code generation package
import { QRCodeCanvas } from "qrcode.react";

function CreateEventPage() {

  // React Router navigation hook
  const navigate = useNavigate();

  // Store event title input value
  const [title, setTitle] = useState("");

  // Store newly created event data
  const [createdEvent, setCreatedEvent] = useState(null);

  // Track loading state during API request
  const [isLoading, setIsLoading] = useState(false);

  // Handle event creation form submission
  async function handleSubmit(e) {
    e.preventDefault();

    // Prevent empty event titles
    if (!title.trim()) {
      alert("Please enter an event title");
      return;
    }

    // Enable loading state
    setIsLoading(true);

    try {

      // Send create event request to backend/API
      const data = await createEvent({ title });

      // Save returned event data
      setCreatedEvent(data);

      // Clear form input after success
      setTitle("");

    } catch (err) {

      // Log and display any errors
      console.error(err);
      alert("Failed to create event");

    } finally {

      // Disable loading state
      setIsLoading(false);
    }
  }

  return (
    <>
      {/* Top application header */}
      <header className="app-header">
        <div className="app-header-inner">

          {/* Application branding */}
          <div className="app-logo">
            Workshop Navigator
          </div>

        </div>
      </header>

      <main className="page">

        {/* Page introduction */}
        <div className="page-header">

          <h1 className="page-title">
            Create Event
          </h1>

          <p className="page-subtitle">
            Set up a new workshop session
          </p>

        </div>

        {/* Event creation form */}
        <section className="card">

          <h2>Event Details</h2>

          <form onSubmit={handleSubmit}>

            {/* Event title label */}
            <label className="form-label">
              Event Title
            </label>

            {/* Event title text input */}
            <input
              className="input"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g. Gen Z Leadership Workshop"
            />

            {/* Submit button */}
            <button
              className="button-primary"
              type="submit"
            >
              {isLoading ? "Creating..." : "Create Event"}
            </button>

          </form>
        </section>

        {/* Display created event details after success */}
        {createdEvent && (
          <>
            <section className="card card-centered">

              {/* Success message */}
              <p className="card-label">
                Event created
              </p>

              {/* Display created event title */}
              <h2>{createdEvent.title}</h2>

              {/* Display generated event code */}
              <p className="muted">
                Event Code
              </p>

              <h2>{createdEvent.event_code}</h2>

              {/* Shareable attendee join link */}
              <p
                className="muted"
                style={{ marginTop: "16px" }}
              >
                Share this link
              </p>

              {/* Display full join URL */}
              <div className="share-link">
                {`${window.location.origin}/join/${createdEvent.event_code}`}
              </div>

              {/* Copy join link to clipboard */}
              <button
                className="button-primary"
                onClick={() => {
                  navigator.clipboard.writeText(
                    `${window.location.origin}/join/${createdEvent.event_code}`
                  );

                  alert("Link copied!");
                }}
              >
                Copy Link
              </button>

              {/* QR code section for mobile workshop joining */}
              <div style={{ marginTop: "20px" }}>

                <QRCodeCanvas

                  // QR code destination URL
                  value={`${window.location.origin}/join/${createdEvent.event_code}`}

                  // QR code dimensions
                  size={180}

                  // QR code background colour
                  bgColor="#ffffff"

                  // QR code foreground colour
                  fgColor="#000000"
                />

              </div>
            </section>
          </>
        )}
      </main>
    </>
  );
}

export default CreateEventPage;