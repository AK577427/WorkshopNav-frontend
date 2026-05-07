function QuestionList() {
  const questions = [
    {
      id: 1,
      text: "How do you improve Gen Z engagement?",
      upvotes: 4,
      anonymous: true,
    },
    {
      id: 2,
      text: "What leadership styles work best?",
      upvotes: 2,
      anonymous: false,
    },
  ];

  return (
    <section className="card">
      <p className="card-label">Live questions</p>
      <h2>Audience Questions</h2>

      <div className="stack">
        {questions.map((question) => (
          <div key={question.id} className="question-item">
            <p>{question.text}</p>

            <div className="question-meta">
              <span>{question.anonymous ? "Anonymous" : "Named User"}</span>

              <button className="upvote-button">
                ▲ {question.upvotes}
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default QuestionList;