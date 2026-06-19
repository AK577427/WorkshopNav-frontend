import { useState } from "react";
import { useParams } from "react-router-dom";
import FeedbackForm from "../components/feedback/FeedbackForm";
import EmailCaptureForm from "../components/email/EmailCaptureForm";
import Footer from "../components/shared/Footer";
import { useNavigate } from "react-router-dom";

function EventCompletePage({ eventId :propEventId }) {
  const {eventId: routeEventId } = useParams();
  const eventId = propEventId || routeEventId;
  console.log("Event ID from URL:", eventId);
  const [err, setErr] = useState("");
  const navigate = useNavigate();

  return (
    <>
      {/* Top application header */}
      <header className="app-header">
        <div className="app-header-inner">
          {/* Application branding */}
          <div className="app-logo"
          onClick={()=> navigate("/")}>
            Workshop Navigator</div>
        </div>
      </header>

      <main className="page">
        {/* Event completion hero section */}
        <section className="end-hero">
          {/* Success indicator */}
          <div className="success-icon">✓</div>

          <h1 className="page-title">Thank you for joining!</h1>

          <p className="page-subtitle">We hope you found the event valuable.</p>
        </section>

        {/* Collect attendee feedback */}
        <FeedbackForm eventId={eventId} setErr={setErr} />

        {/* Capture attendee email for slides/resources */}
        <EmailCaptureForm eventId={eventId} setErr={setErr} />

        {/* Closing message */}
        <p className="end-note">Thanks again. See you in the next event.</p>
      </main>

      {/* Shared application footer */}
      <Footer />
    </>
  );
}

export default EventCompletePage;
