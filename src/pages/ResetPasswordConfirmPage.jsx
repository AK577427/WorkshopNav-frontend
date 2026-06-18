import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { confirmPasswordReset } from "../services/auth";
import Footer from "../components/shared/Footer";

function ResetPasswordConfirmPage() {
  const navigate = useNavigate();

  // Store new password input values
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [err, setErr] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();

    // Get reset details saved from reset request
    const uid = localStorage.getItem("reset_uid");
    const token = localStorage.getItem("reset_token");

    if (!newPassword || !confirmPassword) {
      setErr("Please complete both password fields.");
      return;
    }

    if (newPassword !== confirmPassword) {
      setErr("Passwords do not match.");
      return;
    }

    if (!uid || !token) {
      setErr("Reset details are missing. Please request a new reset link.");
      return;
    }

    try {
      await confirmPasswordReset({
        uid,
        token,
        new_password: newPassword,
      });

      // Remove reset details after successful password reset
      localStorage.removeItem("reset_uid");
      localStorage.removeItem("reset_token");

      alert("Password reset successfully.");
      navigate("/login");
    } catch (err) {
      console.error(err);
      setErr("We couldn't reset your password.");
    }
  }

  return (
    <>
      <header className="app-header">
        <div className="app-header-inner">
          <div className="app-logo">Workshop Navigator</div>
        </div>
      </header>

      <main className="page">
        <div className="page-header">
          <h1 className="page-title">Set New Password</h1>

          <p className="page-subtitle">
            Enter and confirm your new password.
          </p>
        </div>

        <section className="card">
          <form className="stack" onSubmit={handleSubmit}>
            {err && <p className="error-message">{err}</p>}
            <label className="form-label">
              New Password

              <input
                className="input"
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                placeholder="Enter new password"
              />
            </label>

            <label className="form-label">
              Confirm Password

              <input
                className="input"
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Confirm new password"
              />
            </label>

            <button className="button-primary" type="submit">
              Reset Password
            </button>

            <button
              className="secondary-button"
              type="button"
              onClick={() => navigate("/login")}
            >
              Back to Login
            </button>
          </form>
        </section>
      </main>
      <Footer />
    </>
  );
}

export default ResetPasswordConfirmPage;