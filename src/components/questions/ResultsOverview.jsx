import { useEffect, useState } from "react";
import { getPolls } from "../../services/polls";
import { getQuestions } from "../../services/results";


// src/components/event/ResultsOverview.jsx
function ResultsOverview({eventId}) {
  const [activePollsCount, setActivePollsCount] = useState(0);
  const [totalResponses, setTotalResponses] = useState(0);
  const [questionsCount, setQuestionsCount] = useState(0);

  useEffect(()=> {
    if(!eventId) return;

    async function fetchOverview() {
      try {
        // Polls give us active count + response totals
        const polls = await getPolls(eventId);

        const active = polls.filter((p)=> p.is_active === true);
        setActivePollsCount(active.length);

        const responses = polls.reduce((sum,poll)=> {
          const options = poll.poll_options || [];
          return sum + options.reduce(
            (s,opt)=> s + (opt?.response_count || 0),
            0
          );
        },0);
        setTotalResponses(responses);

        //Questions Count
        const questions = await getQuestions(eventId);
        setQuestionsCount(questions.length);
      }catch(err){
        console.err("Failed to load results overview", err);
      }
    }
    fetchOverview();//run once on mount

    //refresh every 10 mins
    const interval = setInterval(fetchOverview, 10 * 1000);

    //clear on unmount or when event changes
    return ()=> clearInterval(interval);

  }, [eventId])

  return (
    <section className="card">
      <div className="section-header">
        <h2>Quick Results Overview</h2>
      </div>

      <div className="results-grid">
        <div>
          <strong>{activePollsCount}</strong>
          <p>Active Polls</p>
        </div>

        <div>
          <strong>{totalResponses}</strong>
          <p>Total Responses</p>
        </div>

        <div>
          <strong>{questionsCount}</strong>
          <p>Questions</p>
        </div>
      </div>
    </section>
  );
}

// return (
//     <section className="card results-overview">
//       <h2>Results Overview</h2>

//       <div className="results-stats">
//         <div className="result-stat">
//           <span className="result-stat-value">{activePollsCount}</span>
//           <span className="result-stat-label">Active Polls</span>
//         </div>

//         <div className="result-stat">
//           <span className="result-stat-value">{totalResponses}</span>
//           <span className="result-stat-label">Total Responses</span>
//         </div>

//         <div className="result-stat">
//           <span className="result-stat-value">{questionsCount}</span>
//           <span className="result-stat-label">Questions</span>
//         </div>
//       </div>
//     </section>
//   );
// }

export default ResultsOverview;