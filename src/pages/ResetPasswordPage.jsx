import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { requestPasswordReset } from "../services/auth";
import Footer from "../components/shared/Footer";

function ResetPasswordPage() {

  // React Router navigation hook
  const navigate = useNavigate();

  // Store email input value
  const [email, setEmail] = useState("");

  const [err, setErr] = useState("");

  const [sent, setSent] = useState(false);

  // Handle reset password form submission
  async function handleSubmit(e) {
    e.preventDefault();

    // Prevent empty email submissions
    if (!email) {
      setErr("Please enter your email address.");
      return;
    }
    
    try {
    await requestPasswordReset({ email });
    setErr("");
    setSent(true);    
  } catch (err) {
    console.error(err);
    setErr("We couldn't send the password reset request.");
  }
}

  return (
    <>
      {/* Top application header */}
      <header className="app-header">
        <div className="app-header-inner">

          {/* Application branding */}
          <div className="app-logo"
            onClick={()=> navigate("/")}>
            Workshop Navigator
          </div>

        </div>
      </header>

      <main className="page">

        {/* Page introduction */}
        <div className="page-header">

          <h1 className="page-title">
            Reset Password
          </h1>

          <p className="page-subtitle">
            Enter your email and we’ll send you a reset link.
          </p>

        </div>

        {/* Password reset form */}
        <section className="card">
          {sent ? (
            <p className="muted">
            If an account exists for that email, we've sent a reset link. Check your inbox.
            </p>
          ) : (
          <form
            className="stack"
            onSubmit={handleSubmit}
          >
            {err && <p className="error-message">{err}</p>}

            {/* Email input field */}
            <label className="form-label">

              Email

              <input
                className="input"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
              />

            </label>

            {/* Submit password reset request */}
            <button
              className="button-primary"
              type="submit"
            >
              Send Reset Link
            </button>

            {/* Navigate back to login page */}
            <button
              className="secondary-button"
              type="button"
              onClick={() => navigate("/login")}
            >
              Back to Login
            </button>

          </form>
          )}
        </section>
      </main>
      <Footer />
    </>
  );
}

export default ResetPasswordPage;