import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Footer from "../components/shared/Footer";

function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  function handleLogin(e) {
    e.preventDefault();

    if (!email || !password) {
      alert("Enter email and password");
      return;
    }

    // MVP: fake login → just redirect
    navigate("/dashboard/events/new");
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
          <h1 className="page-title">Organiser Login</h1>
          <p className="page-subtitle">
            Access your events and dashboard
          </p>
        </div>

        <section className="card">
          <form onSubmit={handleLogin}>
            <label className="form-label">Email</label>
            <input
              className="input"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
            />

            <label className="form-label">Password</label>
            <input
              type="password"
              className="input"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
            />

            <button className="button-primary">
              Login
            </button>
          </form>
        </section>
      </main>
      <Footer />
    </>
  );
}

export default LoginPage;