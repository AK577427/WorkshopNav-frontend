import { useState } from "react";

function EmailCaptureForm() {
  const [email, setEmail] = useState("");

  function handleSubmit(e) {
    e.preventDefault();

    if (!email.trim()) {
      alert("Please enter your email");
      return;
    }

    console.log({ email });
    setEmail("");
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