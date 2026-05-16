import { useState } from "react";
import { useNavigate } from "react-router-dom";

// Shared footer component
import Footer from "../components/shared/Footer";

import ErrorAlert from "../components/shared/ErrorAlert";

function LoginPage() {

  // Store organiser email input
  const [email, setEmail] = useState("");

  // Store organiser password input
  const [password, setPassword] = useState("");

  // React Router navigation hook
  const navigate = useNavigate();
  
  const [error, setError] = useState("");

  // Handle organiser login form submission
  function handleLogin(e) {
    e.preventDefault();

    // Prevent empty login fields
    if (!email || !password) {
      setError("Please enter your email and password to log in.");
      return;
    }

    // MVP temporary login behaviour
    // Redirect organiser directly to dashboard
    navigate("/dashboard/events/new");
  }

  return (
    <>
      <ErrorAlert message={error} onClose={() => setError("")} />

      {/* Top application header */}
      <header className="app-header">
        <div className="app-header-inner">

          {/* Application branding */}
          <div className="app-logo">
            Workshop Navigator
          </div>

        </div>
      </header>

      <main className="page">

        {/* Page introduction */}
        <div className="page-header">

          <h1 className="page-title">
            Organiser Login
          </h1>

          <p className="page-subtitle">
            Access your events and dashboard
          </p>

        </div>

        {/* Login form card */}
        <section className="card">

          <form onSubmit={handleLogin}>

            {/* Email field label */}
            <label className="form-label">
              Email
            </label>

            {/* Email input */}
            <input
              className="input"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
            />

            {/* Password field label */}
            <label className="form-label">
              Password
            </label>

            {/* Password input */}
            <input
              type="password"
              className="input"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
            />

            {/* Submit login form */}
            <button className="button-primary">
              Login
            </button>

            {/* Navigate to password reset page */}
            <button
              className="secondary-button"
              type="button"
              onClick={() => navigate("/reset-password")}
            >
              Forgot password?
            </button>

          </form>
        </section>
      </main>

      {/* Shared application footer */}
      <Footer />

    </>
  );
}

export default LoginPage;