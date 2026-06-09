import { useEffect, useState } from "react";

// Poll management components
import CreatePoll from "../components/polls/CreatePoll";
import QueuedPolls from "../components/polls/QueuedPolls";
import LivePollCard from "../components/polls/LivePollCard";
import Footer from "../components/shared/Footer";
import { useNavigate, useParams } from "react-router-dom";
import { getEventsPerFacilitator} from "../services/events";
// Shared components
import LogoutButton from "../components/shared/LogoutButton";
import {getPolls} from "../services/results";
import {launchPoll, deletePoll, updatePollStatus} from "../services/polls";

// Question and analytics components
import RecentQuestions from "../components/questions/RecentQuestions";
import ResultsOverview from "../components/questions/ResultsOverview";

function FacilitatorEventDetailsPage() {

  const navigate = useNavigate();
  const { eventId } = useParams();

  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [deleteMessage, setDeleteMessage] = useState("");

  // Track currently active navigation tab
  const [activeTab, setActiveTab] = useState("overview");

  // Store polls waiting to be launched
  const [queuedPolls, setQueuedPolls] = useState([]);

  // Store currently active live polls
  const [activePolls, setActivePolls] = useState([ ]);

  useEffect(() => {
    async function fetchEvent() {
      try {
        const events = await getEventsPerFacilitator();
        const found = events.find(
          (e)=> String(e.id) === String(eventId) 
        );
        setEvent(found ?? null);
        console.log("Fetched event data:", found);
        console.log("title: ", found?.title);
      } catch (error) {
        console.error("Error fetching event:", error);
      } finally {
        setLoading(false);
      }
    }

    if (eventId && eventId !== "undefined") {
      fetchEvent();
    }
  }, [eventId]);

  useEffect(() => {
  console.log("eventId from URL:", eventId);
  console.log("event object:", event);
}, [event]);

  useEffect(() => {
  async function fetchPolls() {
    try {
      const polls = await getPolls(eventId);
      console.log("Fetched polls:", polls);

      const queued = polls.filter(
        (poll) => poll.is_active === false
      );

      const live = polls.filter(
        (poll) => poll.is_active === true
      );

      setQueuedPolls(queued);
      setActivePolls(live);

    } catch (err) {
      console.error("Failed to load polls", err);
    }
  }

  if (eventId) {
    fetchPolls();
  }
}, [eventId]);


  // Add newly created poll into queue
  function handleCreatePoll(newPoll) {
    setQueuedPolls([...queuedPolls, newPoll]);
  }

  // Move poll from queued state into active live polls
  function handleLaunchPoll(pollToLaunch) {

    const responseLaunchPoll = launchPoll(pollToLaunch.id);

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
        options: pollToLaunch.poll_options.map((option) => ({
          label: option,
          votes: 0,
        })),
      },
    ]);
  }

  async function handleDeletePoll(pollId) {
    try {
      await deletePoll(pollId);
      setQueuedPolls((prevQueuedPolls) =>
        prevQueuedPolls.filter((poll) => poll.id !== pollId)
      );
      setDeleteMessage("Poll deleted successfully.");
      setTimeout(() => setDeleteMessage(""), 3000);
    } catch (error) {
      console.error("Error deleting poll:", error);
      setDeleteMessage("Unable to delete poll. Please try again.");
      setTimeout(() => setDeleteMessage(""), 3000);
    }
  }

async function handleDeactivatePoll(pollId) {
  try {
    await updatePollStatus(pollId);
      console.log("Poll deactivated:", pollId);
  setActivePolls((prevActivePolls) =>
    prevActivePolls.filter((poll) => poll.id !== pollId)
  );
  const poll = activePolls.find((p) => p.id === pollId);
  if(poll){
    setQueuedPolls((prev)=>[
      ...prev,
      {
        ...poll,
        poll_options: poll.poll_options.map((option) => option.option_text)
      },
    ]);
  }
  } catch (error) {
    console.error("Error deactivating poll:", error);
  } finally {
    setActivePolls((prevActivePolls) =>
      prevActivePolls.filter((poll) => poll.id !== pollId)
    );
  } 
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

            <h1>{event?.title}</h1>

            <span className="live-badge">{event?.is_active ? "Live" : "Completed"}
            </span>

          </div>

          {/* Event today's date/time */}
          <p>{event?.date_time || new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: '2-digit' })}</p>

          {/* Event access code */}
          <p>Event Code: {event?.event_code}</p>

        </div>
      </section>

      {/* Poll management section */}
      <section
        id="polls"
        className="event-section"
      >

        <div className="event-section">
          {/* Poll creation form */}
          <CreatePoll onCreatePoll={handleCreatePoll} />

          {deleteMessage && (
            <p className="success-message">{deleteMessage}</p>
          )}
        </div>

        {/* List of polls waiting to launch */}
        <QueuedPolls
          polls={queuedPolls}
          onLaunchPoll={handleLaunchPoll}
          onDeletePoll={handleDeletePoll}
        />

        {/* Currently active live polls */}
        <section className="card">

          <h2>Active Polls</h2>

          {/* Render all active polls */}
          {activePolls.map((poll) => (
            <LivePollCard
              key={poll.id}
              pollId={poll.id}
              question={poll.question}
              options={poll.poll_options.map((option) => ({
                label: option.option_text,
                votes: option.response_count,
              }))}
              onDeactivate={handleDeactivatePoll}
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