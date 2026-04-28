function GetSlidesCard() {
  return (
    <div
      style={{
        border: "1px solid #ccc",
        borderRadius: "12px",
        padding: "20px",
        maxWidth: "500px",
        margin: "20px auto",
        textAlign: "center",
      }}
    >
      <h2>Get the Slides</h2>

      <p
        style={{
          marginTop: "12px",
          color: "#555",
        }}
      >
        Access presentation resources and workshop materials.
      </p>

      <button
        style={{
          marginTop: "20px",
          width: "100%",
          padding: "12px",
          borderRadius: "8px",
          border: "none",
          background: "#6b46c1",
          color: "white",
          cursor: "pointer",
        }}
      >
        Access Slides
      </button>
    </div>
  );
}

export default GetSlidesCard;