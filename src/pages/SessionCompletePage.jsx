import FeedbackForm from "../components/feedback/FeedbackForm";
import EmailCaptureForm from "../components/email/EmailCaptureForm";

function SessionCompletePage() {
  return (
    <div>
      <h1>Thanks for joining</h1>
      <p>Please share your feedback and enter your email if you want the slides.</p>

      <FeedbackForm />
      <EmailCaptureForm />
    </div>
  );
}

export default SessionCompletePage;