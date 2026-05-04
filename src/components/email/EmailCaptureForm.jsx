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
    <div
      style={{
        border: "1px solid #ccc",
        borderRadius: "12px",
        padding: "20px",
        maxWidth: "500px",
        margin: "20px auto",
      }}
    >
      <h2>Get the Slides</h2>

      <form onSubmit={handleSubmit}>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your email address"
          style={{
            width: "100%",
            padding: "12px",
            borderRadius: "8px",
            boxSizing: "border-box",
          }}
        />

        <button
          type="submit"
          style={{
            marginTop: "20px",
            width: "100%",
            padding: "12px",
            borderRadius: "8px",
            border: "none",
            background: "#6b46c1",
            color: "white",
            cursor: "pointer",
          }}
        >
          Send Me the Slides
        </button>
      </form>
    </div>
  );
}

export default EmailCaptureForm;