function Alert({ type = "success", message, onClose }) {
  if (!message) return null;

  const styles = {
    padding: "10px 15px",
    marginBottom: "15px",
    borderRadius: "5px",
    color: type === "success" ? "#0f5132" : "#842029",
    backgroundColor: type === "success" ? "#d1e7dd" : "#f8d7da",
    border: `1px solid ${type === "success" ? "#badbcc" : "#f5c2c7"}`,
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center"
  };

  return (
    <div style={styles}>
      <span>{message}</span>
      <button 
        onClick={onClose} 
        style={{
          background: "none",
          border: "none",
          fontWeight: "bold",
          cursor: "pointer",
          color: "inherit"
        }}
      >
        ×
      </button>
    </div>
  );
}

export default Alert;
