import { useState } from "react";
import CreatePoll from "../components/polls/CreatePoll";
import QueuedPolls from "../components/polls/QueuedPolls";
import LivePollCard from "../components/polls/LivePollCard";
import RecentQuestions from "../components/questions/RecentQuestions";
import ResultsOverview from "../components/questions/ResultsOverview";

function FacilitatorEventDetailsPage() {
  const [activeTab, setActiveTab] = useState("overview");

  const [queuedPolls, setQueuedPolls] = useState([]);
  const [activePolls, setActivePolls] = useState([
    {
      id: 1,
      question: "How was the session so far?",
      options: [
        { label: "Great", votes: 25 },
        { label: "Good", votes: 15 },
        { label: "Needs more examples", votes: 5 },
      ],
    },
    {
      id: 2,
      question: "What topics interest you most?",
      options: [
        { label: "Leadership", votes: 12 },
        { label: "Communication", votes: 9 },
        { label: "Gen Z workplace culture", votes: 11 },
      ],
    },
  ]);

  function scrollToSection(sectionId) {
    setActiveTab(sectionId);
    document.getElementById(sectionId)?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  }

  function handleCreatePoll(newPoll) {
    setQueuedPolls([...queuedPolls, newPoll]);
  }

  function handleLaunchPoll(pollToLaunch) {
    setQueuedPolls(queuedPolls.filter((poll) => poll.id !== pollToLaunch.id));

    setActivePolls([
      ...activePolls,
      {
        ...pollToLaunch,
        options: pollToLaunch.options.map((option) => ({
          label: option,
          votes: 0,
        })),
      },
    ]);
  }

  return (
    <main className="page event-details-page">
      <button className="back-link">← Back to Dashboard</button>

      <section id="overview" className="event-summary-card">
        <div className="event-summary-content">
          <div className="event-title-row">
            <h1>Gen Z Leadership Workshop</h1>
            <span className="live-badge">Live</span>
          </div>

          <p>May 22, 2025 · 10:00 AM</p>
          <p>Event Code: AB12CD</p>
        </div>
      </section>

      <nav className="event-tabs">
        <button className={activeTab === "overview" ? "active" : ""} onClick={() => scrollToSection("overview")}>Overview</button>
        <button className={activeTab === "polls" ? "active" : ""} onClick={() => scrollToSection("polls")}>Polls</button>
        <button className={activeTab === "questions" ? "active" : ""} onClick={() => scrollToSection("questions")}>Questions</button>
        <button className={activeTab === "results" ? "active" : ""} onClick={() => scrollToSection("results")}>Results</button>
      </nav>

      <section id="polls" className="event-section">
        <CreatePoll onCreatePoll={handleCreatePoll} />

        <QueuedPolls
          polls={queuedPolls}
          onLaunchPoll={handleLaunchPoll}
        />

        <section className="card">
          <h2>Active Polls</h2>

          {activePolls.map((poll) => (
            <LivePollCard
              key={poll.id}
              question={poll.question}
              options={poll.options}
            />
          ))}
        </section>
      </section>

      <section id="questions" className="event-section">
        <RecentQuestions />
      </section>

      <section id="results" className="event-section">
        <ResultsOverview />
      </section>
    </main>
  );
}

export default FacilitatorEventDetailsPage;