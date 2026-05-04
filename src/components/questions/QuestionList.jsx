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
    <div
      style={{
        border: "1px solid #ccc",
        borderRadius: "12px",
        padding: "20px",
        maxWidth: "500px",
        margin: "20px auto",
      }}
    >
      <h2>Audience Questions</h2>

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "12px",
          marginTop: "20px",
        }}
      >
        {questions.map((question) => (
          <div
            key={question.id}
            style={{
              border: "1px solid #ddd",
              borderRadius: "8px",
              padding: "12px",
            }}
          >
            <p>{question.text}</p>

            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                marginTop: "10px",
                fontSize: "14px",
              }}
            >
              <span>
                {question.anonymous ? "Anonymous" : "Named User"}
              </span>

              <button
                style={{
                  border: "none",
                  background: "transparent",
                  cursor: "pointer",
                  color: "#6b46c1",
                }}
              >
                ▲ {question.upvotes}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default QuestionList;