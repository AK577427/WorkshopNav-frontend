import { Routes, Route } from "react-router-dom";
import DashboardPage from "./pages/DashboardPage";
import JoinEventPage from "./pages/JoinEventPage";
import SessionCompletePage from "./pages/SessionCompletePage";
import AttendeeSessionPage from "./pages/AttendeeSessionPage";
import ResultsPage from "./pages/ResultsPage";
import HomePage from "./pages/Homepage";
import LoginPage from "./pages/LoginPage";
import CreateEventPage from "./pages/CreateEventPage";
import "./App.css";
import EventDetailsPage from "./pages/EventDetailsPage";

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/join/:eventCode" element={<JoinEventPage />} />

      {/* CREATE EVENT */}
      <Route path="/dashboard/events/new" element={<CreateEventPage />} />

      {/* SESSION */}
      <Route path="/event/:eventId" element={<AttendeeSessionPage />} />

      <Route
        path="/event/:eventId/complete"
        element={<SessionCompletePage />}
      />

      {/* DASHBOARD */}
      <Route path="/dashboard" element={<DashboardPage />} />

      {/* EVENT DETAILS */}
      <Route path="/dashboard/events/:eventId" element={<EventDetailsPage />} />
      
      {/* RESULTS */}
      <Route path="/results/:eventId" element={<ResultsPage />} />
    </Routes>
  );
}

export default App;
