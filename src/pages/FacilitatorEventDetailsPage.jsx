import { useEffect, useState } from "react";

// Poll management components
import CreatePoll from "../components/polls/CreatePoll";
import QueuedPolls from "../components/polls/QueuedPolls";
import LivePollCard from "../components/polls/LivePollCard";
import Footer from "../components/shared/Footer";
import { useNavigate, useParams } from "react-router-dom";
import { getEventsPerFacilitator } from "../services/events";
// Shared components
import LogoutButton from "../components/shared/LogoutButton";

// Question and analytics components
import RecentQuestions from "../components/questions/RecentQuestions";
import ResultsOverview from "../components/questions/ResultsOverview";

function FacilitatorEventDetailsPage() {

  const navigate = useNavigate();
  const { eventId } = useParams();

  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);

  // Track currently active navigation tab
  const [activeTab, setActiveTab] = useState("overview");

  // Store polls waiting to be launched
  const [queuedPolls, setQueuedPolls] = useState([]);

  // Store currently active live polls
  const [activePolls, setActivePolls] = useState([

    // Mock active poll data
    {
      id: 1,
      question: "How was the event so far?",
      options: [
        { label: "Great", votes: 25 },
        { label: "Good", votes: 15 },
        { label: "Needs more examples", votes: 5 },
      ],
    },

    // Mock active poll data
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

  useEffect(() => {
    async function fetchEvent() {
      try {
        const data = await getEventsPerFacilitator(eventId);
        setEvent(data);
      } catch (error) {
        console.error("Error fetching event:", error);
      } finally {
        setLoading(false);
      }
    }

    if (eventId) {
      fetchEvent();
    }
  }, [eventId]);

  // Smooth scroll navigation between page sections
  function scrollToSection(sectionId) {

    // Update active tab styling
    setActiveTab(sectionId);

    // Scroll to matching section
    document.getElementById(sectionId)?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  }

  // Add newly created poll into queue
  function handleCreatePoll(newPoll) {
    setQueuedPolls([...queuedPolls, newPoll]);
  }

  // Move poll from queued state into active live polls
  function handleLaunchPoll(pollToLaunch) {

    // Remove poll from queued list
    setQueuedPolls(
      queuedPolls.filter(
        (poll) => poll.id !== pollToLaunch.id
      )
    );

    // Add poll into active polls list
    setActivePolls([
      ...activePolls,
      {
        ...pollToLaunch,

        // Convert plain option strings into poll objects
        options: pollToLaunch.options.map((option) => ({
          label: option,
          votes: 0,
        })),
      },
    ]);
  }

  if (loading) {
    return (
      <div className="dashboard-container">
        <p>Loading event details…</p>
      </div>
    );
  }

  if (!event) {
    return (
      <div className="dashboard-container">
        <p>Event not found.</p>
      </div>
    );
  }

  return (
  <>
  <header className="app-header">
        <div className="app-header-inner">
          {/* Application branding */}
          <div className="app-logo" 
          onClick={()=> navigate("/")}>
            Workshop Navigator
          </div>

          {/* Organiser account actions */}
          <div className="header-actions">
            <LogoutButton />
          </div>
        </div>
      </header>
    <main className="page event-details-page">

      {/* Navigation button back to facilitator dashboard */}
      <button className="back-link"
      onClick={() => navigate("/dashboard")}>
        ← Back to Dashboard
      </button>

      {/* Event overview section */}
      <section
        id="overview"
        className="event-summary-card"
      >

        <div className="event-summary-content">

          {/* Event title and live status */}
          <div className="event-title-row">

            <h1>{event?.title || "Event Title"}</h1>

            <span className="live-badge">
              {event?.is_active ? "Live" : "Completed"}
            </span>

          </div>

          {/* Event date/time */}
          <p>{event?.date_time || "May 22, 2025 · 10:00 AM"}</p>

          {/* Event access code */}
          <p>Event Code: {event?.event_code || "AB12CD"}</p>

        </div>
      </section>

      {/* Poll management section */}
      <section
        id="polls"
        className="event-section"
      >

        {/* Poll creation form */}
        <CreatePoll onCreatePoll={handleCreatePoll} />

        {/* List of polls waiting to launch */}
        <QueuedPolls
          polls={queuedPolls}
          onLaunchPoll={handleLaunchPoll}
        />

        {/* Currently active live polls */}
        <section className="card">

          <h2>Active Polls</h2>

          {/* Render all active polls */}
          {activePolls.map((poll) => (
            <LivePollCard
              key={poll.id}
              question={poll.question}
              options={poll.options}
            />
          ))}

        </section>
      </section>

      {/* Attendee questions section */}
      <section
        id="questions"
        className="event-section"
      >

        <RecentQuestions />

      </section>

      {/* Event analytics/results section */}
      <section
        id="results"
        className="event-section"
      >

        <ResultsOverview />

      </section>

    </main>
    <Footer />
  
  </>
  );
}

export default FacilitatorEventDetailsPage;