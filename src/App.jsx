import { Routes, Route } from "react-router-dom";
import JoinEventPage from "./pages/JoinEventPage";
import CreateEventPage from "./pages/CreateEventPage";

import AttendeeSessionPage from "./pages/AttendeeSessionPage";

function App() {
  return (
    <Routes>
      <Route path="/join/:eventCode" element={<JoinEventPage />} />
      <Route path="/dashboard/events/new" element={<CreateEventPage />} />
      <Route path="/event/:eventId" element={<AttendeeSessionPage />} />
    </Routes>
  );
}

export default App;