import { useState } from "react";
import { captureEmail } from "../../services/emails";


function EmailCaptureForm({ eventId,setError }) {
  const [email, setEmail] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();

    if (!email.trim()) {
      setError("Please enter your email address.");
      return;
    }
    
    try {
      await captureEmail(eventId, {
        email,
      });

      setEmail("");
    } catch (err) {
      console.error(err);
      setError("We couldn't submit your email. Please try again.");
    }
  }

  return (
    <section className="card">
      <p className="card-label">Resources</p>
      <h2>Get the Slides</h2>

      <form onSubmit={handleSubmit}>
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