import { Routes, Route } from "react-router-dom";
import JoinEventPage from "./pages/JoinEventPage";
import CreateEventPage from "./pages/CreateEventPage";
import SessionCompletePage from "./pages/SessionCompletePage";
import AttendeeSessionPage from "./pages/AttendeeSessionPage";
import FacilitatorDashboardPage from "./pages/FacilitatorDashboardPage";
import "./App.css";

function App() {
  return (
    <Routes>
      <Route path="/join/:eventCode" element={<JoinEventPage />} />
      <Route path="/dashboard/events/new" element={<CreateEventPage />} />
      <Route path="/event/:eventId" element={<AttendeeSessionPage />} />
      <Route path="/event/:eventId/complete" element={<SessionCompletePage />} />
      <Route path="/dashboard/events/:eventId" element={<FacilitatorDashboardPage />} />
    </Routes>
  );
}

export default App;