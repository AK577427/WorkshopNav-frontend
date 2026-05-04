import { Routes, Route } from "react-router-dom";

import JoinEventPage from "./pages/JoinEventPage";
import CreateEventPage from "./pages/CreateEventPage";

import SessionHome from "./pages/SessionHome";
import DashboardPage from "./pages/DashboardPage";
import AskQuestion from "./pages/AskQuestion";
import GetSlides from "./pages/GetSlides";

import SessionCompletePage from "./pages/SessionCompletePage";
import AttendeeSessionPage from "./pages/AttendeeSessionPage";

function App() {
  return (
    <Routes>
      {/* ✅ First screen (Join) */}
      <Route path="/" element={<JoinEventPage />} />
      <Route path="/dashboard" element={<DashboardPage />} />

      {/* Existing routes */}
      <Route path="/join/:eventCode" element={<JoinEventPage />} />
      <Route path="/dashboard/events/new" element={<CreateEventPage />} />

      {/* Your frontend flow */}
      <Route path="/session" element={<SessionHome />} />
      <Route path="/ask" element={<AskQuestion />} />
      <Route path="/slides" element={<GetSlides />} />

      {/* Teammate routes (KEEP THESE) */}
      <Route path="/event/:eventId" element={<AttendeeSessionPage />} />
      <Route
        path="/event/:eventId/complete"
        element={<SessionCompletePage />}
      />
    </Routes>
  );
}

export default App;