function ErrorAlert({ message, onClose }) {
  if (!message) return null;

  return (
    <div className="error-band" role="alert">
      <span>{message}</span>
      <button type="button" onClick={onClose} aria-label="Close error message">
        ×
      </button>
    </div>
  );
}

export default ErrorAlert;