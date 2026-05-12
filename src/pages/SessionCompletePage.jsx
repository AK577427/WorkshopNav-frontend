import FeedbackForm from "../components/feedback/FeedbackForm";
import EmailCaptureForm from "../components/email/EmailCaptureForm";
import Footer from "../components/shared/Footer";

function SessionCompletePage() {
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

        {/* Session completion hero section */}
        <section className="end-hero">

          {/* Success indicator */}
          <div className="success-icon">
            ✓
          </div>

          <h1 className="page-title">
            Thank you for joining!
          </h1>

          <p className="page-subtitle">
            We hope you found the session valuable.
          </p>

        </section>

        {/* Collect attendee feedback */}
        <FeedbackForm />

        {/* Capture attendee email for slides/resources */}
        <EmailCaptureForm />

        {/* Closing message */}
        <p className="end-note">
          Thanks again. See you in the next session.
        </p>

      </main>

      {/* Shared application footer */}
      <Footer />

    </>
  );
}

export default SessionCompletePage;