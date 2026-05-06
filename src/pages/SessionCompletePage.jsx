import FeedbackForm from "../components/feedback/FeedbackForm";
import EmailCaptureForm from "../components/email/EmailCaptureForm";
import Footer from "../components/shared/Footer";

function SessionCompletePage() {
  return (
    <>
      <header className="app-header">
        <div className="app-header-inner">
          <div className="app-logo">Workshop Navigator</div>
        </div>
      </header>

      <main className="page">
        <div className="page-header">
          <h1 className="page-title">Thanks for joining</h1>
          <p className="page-subtitle">
            Share your feedback and enter your email if you want the slides.
          </p>
        </div>

        <FeedbackForm />
        <EmailCaptureForm />
      </main>
      <Footer />
    </>
  );
}

export default SessionCompletePage;