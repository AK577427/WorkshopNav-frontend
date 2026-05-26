import { useState } from "react";
import { captureEmail } from "../../services/emails";


function EmailCaptureForm({ eventId }) {
  const [email, setEmail] = useState("");
  const [err, setErr] = useState(""); 

  async function handleSubmit(e) {
    e.preventDefault();

    if (!email.trim()) {
      setErr("Please enter your email address.");
      return;
    }
    
    try {
      await captureEmail(eventId, {
        email,
      });

      setEmail("");
    } catch (err) {
      console.error(err);
      setErr("We couldn't submit your email. Please try again.");
    }
  }

  return (
    <section className="card">
      <p className="card-label">Resources</p>
      <h2>Get the Slides</h2>

      <form onSubmit={handleSubmit}>
      {err && <p className="error-message">{err}</p>}
        <input
          className="input"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your email address"
        />

        <button type="submit" className="button-primary">
          Send Me the Slides
        </button>
      </form>
    </section>
  );
}

export default EmailCaptureForm;