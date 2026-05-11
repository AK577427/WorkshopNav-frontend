import { Routes, Route } from "react-router-dom";
import JoinEventPage from "./pages/JoinEventPage";
import CreateEventPage from "./pages/CreateEventPage";
import SessionCompletePage from "./pages/SessionCompletePage";
import AttendeeSessionPage from "./pages/AttendeeSessionPage";
import ResultsPage from "./pages/ResultsPage";
import HomePage from "./pages/Homepage";
import LoginPage from "./pages/LoginPage";
<<<<<<< feature/event-details-page
=======
import SignupPage from "./pages/SignupPage";
>>>>>>> main
import FacilitatorEventDetailsPages from "./pages/FacilitatorEventDetailsPage";
import "./App.css";

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/join/:eventCode" element={<JoinEventPage />} />
      <Route path="/dashboard/events/new" element={<CreateEventPage />} />
      <Route path="/event/:eventId" element={<AttendeeSessionPage />} />
      <Route path="/event/:eventId/complete" element={<SessionCompletePage />} />
      <Route path="/dashboard/events/:eventCode" element={<FacilitatorEventDetailsPages />} />
      <Route path="/results/:eventId" element={<ResultsPage />} />
      <Route path="/signup" element={<SignupPage />} />
    </Routes>
  );
}

export default App;