import { Routes, Route } from "react-router-dom";
import JoinEventPage from "./pages/JoinEventPage";
import CreateEventPage from "./pages/CreateEventPage";
import SessionCompletePage from "./pages/SessionCompletePage";
import AttendeeSessionPage from "./pages/AttendeeSessionPage";
import FacilitatorDashboardPage from "./pages/FacilitatorDashboardPage";
import ResultsPage from "./pages/ResultsPage";
import HomePage from "./pages/Homepage";
import Dashboard from "./pages/Dashboard";
import LoginPage from "./pages/LoginPage";
import "./App.css";

function App() {
  return (
    <Routes>
  <Route path="/" element={<HomePage />} />
  <Route path="/login" element={<LoginPage />} />
  <Route path="/join/:eventCode" element={<JoinEventPage />} />
  <Route path="/dashboard" element={<Dashboard />} />
</Routes>
  );
}

export default App;