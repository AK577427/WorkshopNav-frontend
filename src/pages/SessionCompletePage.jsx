import FeedbackForm from "../components/feedback/FeedbackForm";
import EmailCaptureForm from "../components/email/EmailCaptureForm";

function SessionCompletePage() {
  return (
    <>
      <header className="app-header">
        <div className="app-header-inner">
          <div className="app-logo">Workshop Navigator</div>
        </div>
      </header>

      <main className="page">
        <section className="end-hero">
          <div className="success-icon">✓</div>

          <h1 className="page-title">Thank you for joining!</h1>

          <p className="page-subtitle">
            We hope you found the session valuable.
          </p>
        </section>

        <FeedbackForm />

        <EmailCaptureForm />

        <p className="end-note">
          Thanks again. See you in the next session.
        </p>
      </main>
    </>
  );
}

export default SessionCompletePage;