import { useState } from "react";
import { useNavigate } from "react-router-dom";

function SignupPage() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  function handleChange(e) {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  }

  function handleSubmit(e) {
    e.preventDefault();

    if (!formData.name || !formData.email || !formData.password) {
      alert("Please fill in all fields");
      return;
    }

    navigate("/dashboard");
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
          <h1 className="page-title">Create Organiser Account</h1>
          <p className="page-subtitle">
            Sign up to create and manage workshop events.
          </p>
        </div>

        <section className="card">
          <form className="stack" onSubmit={handleSubmit}>
            <label className="form-label">
              Full Name
              <input
                className="input"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Enter your full name"
              />
            </label>

            <label className="form-label">
              Email
              <input
                className="input"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter your email"
              />
            </label>

            <label className="form-label">
              Password
              <input
                className="input"
                name="password"
                type="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Enter your password"
              />
            </label>

            <button className="button-primary" type="submit">
              Create Organiser Account
            </button>
          </form>
        </section>
      </main>
    </>
  );
}

export default SignupPage;