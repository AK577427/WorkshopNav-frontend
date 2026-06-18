import { useEffect, useState } from "react";

// Poll management components
import CreatePoll from "../components/polls/CreatePoll";
import QueuedPolls from "../components/polls/QueuedPolls";
import LivePollCard from "../components/polls/LivePollCard";
import Footer from "../components/shared/Footer";
import { useNavigate, useParams } from "react-router-dom";
import { getEventsPerFacilitator, deleteEvent, updateEvent} from "../services/events";
// Shared components
import LogoutButton from "../components/shared/LogoutButton";
import {getPolls} from "../services/results";
import {launchPoll, deletePoll, updatePollStatus} from "../services/polls";
import { QRCodeCanvas } from "qrcode.react";

// Question and analytics components
import RecentQuestions from "../components/questions/RecentQuestions";
import ResultsOverview from "../components/questions/ResultsOverview";

function FacilitatorEventDetailsPage() {

  const navigate = useNavigate();
  const { eventId } = useParams();
  const [copied, setCopied] =useState(false);

  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [deleteMessage, setDeleteMessage] = useState("");

  const [updating, setUpdating] = useState(false);
  const [deleting, setDeleting] = useState(false);

  // Track currently active navigation tab
  // const [activeTab, setActiveTab] = useState("overview");

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

  // refresh every 10 seconds
  const interval = setInterval(fetchPolls, 10 * 1000);

  // clear on unmount or when eventId changes
  return () => clearInterval(interval);

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

  async function handleMarkCompleted() {
    if (!event) return;
    try {
      setUpdating(true);
      await updateEvent(event.id, { is_active: false });
      setEvent((prev) => ({ ...prev, is_active: false }));
    } catch (error) {
      console.error("Error marking event as completed:", error);
    } finally {
      setUpdating(false);
    }
  }
 
  // Delete the event, then route back to the dashboard.
  async function handleDeleteEvent() {
    if (!event) return;
    const confirmed = window.confirm(
      "Delete this event? This cannot be undone."
    );
    if (!confirmed) return;
    try {
      setDeleting(true);
      // Pass whatever deleteEvent expects (event.id here; switch to `event`
      // if your service signature uses the full object).
      await deleteEvent(event.id);
      navigate("/dashboard");
    } catch (error) {
      console.error("Error deleting event:", error);
      setDeleting(false);
    }
  }

  async function handleCopyLink() {
  try {
    await navigator.clipboard.writeText(joinLink);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  } catch (err) {
    console.error("Failed to copy link", err);
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

  const joinLink = `${window.location.origin}/join/${event.event_code}/`;

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
      <section id="overview" className="event-summary-card">

        <div className="event-summary-content">
          {/* <div className="event-summary-main"> */}

          {/* Event title and live status */}
          <div className="event-title-row">

            <h1>{event?.title}</h1>

            <span className="live-badge">{event?.is_active ? "Live" : "Completed"}
            </span>
            
            {/* Event today's date/time */}
            <p>{event?.date_time || new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: '2-digit' })}</p>

            {/* Event access code */}
            <p>Event Code: {event?.event_code}</p>
          </div>

          {/* Shareable join link + QR code (derived from event code) */}
            <div className="event-share">
              <p className="event-share-label">Share this link</p>

              <div className="event-share-link">{joinLink}</div>

              <button className="copy-link-btn" onClick={handleCopyLink}>
                {copied ? "Copied!" : "Copy Link"}
              </button>

              <div className="event-qr">
                <QRCodeCanvas value={joinLink} size={160} />
              </div>
            </div>
          {/* </div> */}
        </div>
        </section>

            {/* Event-level actions */}
            <div className="event-summary-actions">
              <button
                className="mark-completed-btn"
                onClick={handleMarkCompleted}
                disabled={!event?.is_active || updating}
              >
                {!event?.is_active
                  ? "Completed"
                  : updating
                    ? "Updating…"
                    : "Mark as Completed"}
              </button>
 
              <button
                className="delete-event-btn"
                onClick={handleDeleteEvent}
                disabled={deleting}
              >
                {deleting ? "Deleting…" : "Delete Event"}
              </button>
              </div>
      
      {/* Event analytics/results section */}
      <section
        id="results"
        className="event-section"
      >

        <ResultsOverview eventId = {eventId}/>

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

        {/* <RecentQuestions /> */}
        <RecentQuestions eventId={eventId}/>

      </section>

      

    </main>
    <Footer />
  
  </>
  );
}

export default FacilitatorEventDetailsPage;