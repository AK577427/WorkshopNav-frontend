import { useState, useEffect } from "react";
import { getPolls } from "../../services/polls";
import AttendeePollCard from "./AttendeePollCard";

function AttendeePollList({ eventId }) {
  const [activePolls, setActivePolls] = useState([]);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState("");

  useEffect(() => {
    let cancelled = false;

    async function fetchActivePolls() {
      try {
        const allPolls = await getPolls(eventId);
        const active = allPolls.filter((p) => p.is_active === true);
        if (!cancelled) {
          setActivePolls(active);
          setErr(active.length === 0 ? "No active polls at the moment." : "");
        }
      } catch (e) {
        console.error("Error fetching polls:", e);
        if (!cancelled) setErr("Failed to fetch poll data");
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    fetchActivePolls();
    const interval = setInterval(fetchActivePolls, 10000); // refresh every 10s
    return () => {
      cancelled = true;
      clearInterval(interval);
    };
  }, [eventId]);

  if (loading && activePolls.length === 0) {
    return (
      <article className="card attendee-poll-card">
        <p className="card-label">LIVE POLL</p>
        <h2>Loading poll…</h2>
      </article>
    );
  }

  if (activePolls.length === 0) {
    return (
      <article className="card attendee-poll-card">
        <p className="card-label">LIVE POLL</p>
        <p className="muted">{err || "No active polls at the moment."}</p>
      </article>
    );
  }

  return (
    <>
      {activePolls.map((poll) => (
        <AttendeePollCard key={poll.id} poll={poll} />
      ))}
    </>
  );
}

export default AttendeePollList;