import { useState } from "react";
import { useNavigate } from "react-router-dom";

function ResetPasswordPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");

  function handleSubmit(e) {
    e.preventDefault();

    if (!email) {
      alert("Please enter your email");
      return;
    }

    alert("Password reset link sent");
    navigate("/login");
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
          <h1 className="page-title">Reset Password</h1>
          <p className="page-subtitle">
            Enter your email and we’ll send you a reset link.
          </p>
        </div>

        <section className="card">
          <form className="stack" onSubmit={handleSubmit}>
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

            <button className="button-primary" type="submit">
              Send Reset Link
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
    </>
  );
}

export default ResetPasswordPage;