import { Routes, Route } from "react-router-dom";
import JoinEventPage from "./pages/JoinEventPage";
import CreateEventPage from "./pages/CreateEventPage";
import SessionHome from "./pages/SessionHome";
import AskQuestion from "./pages/AskQuestion";
import GetSlides from "./pages/GetSlides";

function App() {
  return (
    <Routes>
      {/* ✅ First screen (Join) */}
      <Route path="/" element={<JoinEventPage />} />

      <Route path="/join/:eventCode" element={<JoinEventPage />} />
      <Route path="/dashboard/events/new" element={<CreateEventPage />} />

      <Route path="/session" element={<SessionHome />} />
      <Route path="/ask" element={<AskQuestion />} />
      <Route path="/slides" element={<GetSlides />} />
    </Routes>
  );
}

export default App;