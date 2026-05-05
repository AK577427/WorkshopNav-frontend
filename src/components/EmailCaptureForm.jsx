import { useState } from "react";

function EmailCaptureForm() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!email) {
      alert("Please enter an email");
      return;
    }

    console.log("Email captured:", email);

    setSubmitted(true);
    setEmail("");

    setTimeout(() => setSubmitted(false), 3000);
  };

  return (
    <div style={{ marginTop: "20px" }}>
      <h4>Email Updates</h4>

      {submitted ? (
        <p style={{ color: "lightgreen" }}>✅ Email saved!</p>
      ) : (
        <form onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={{
              padding: "10px",
              borderRadius: "6px",
              border: "none",
              marginRight: "10px",
              width: "60%",
            }}
          />
          <button type="submit">Save</button>
        </form>
      )}
    </div>
  );
}

export default EmailCaptureForm;