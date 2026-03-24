import { useState } from "react";
import "../../styles/CommonButtonStyles.css";

function CalendarReminderOverlay({ selectedDate, closeOverlay, addReminder }) {

  const [text, setText] = useState("");

  const handleSave = async () => {
  if (!text.trim()) return;

  const reminder = {
    text,
    date: selectedDate
  };

  try {
    await fetch("http://localhost:5000/reminders", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(reminder)
    });

    addReminder(selectedDate, text); // keep this so UI updates
    setText("");
    closeOverlay();

  } catch (error) {
    console.error("Error saving reminder:", error);
  }
};

  return (
    <div className="overlay">
      <div className="modal">

        <span className="close" onClick={closeOverlay}>
          &times;
        </span>

        <h3 style={{ fontSize: "30px", color: "black", marginTop: "15px" }}>
          Add Reminder
        </h3>

        <label>Reminder:</label>
        <input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
        />

        <label>Date:</label>
        <input
          type="date"
          defaultValue={selectedDate || ""}
        />

        <label>Time:</label>

        <div className="time-row">
          <div className="time-box">
            <label>From:</label>
            <input type="time" />
          </div>

          <div className="time-box">
            <label>To:</label>
            <input type="time" />
          </div>
        </div>

        <label>Description:</label>
        <textarea
          rows="3"
          placeholder="Enter details..."
        ></textarea>

        <label>Sync with:</label>
        <select>
          <option value="">Select user…</option>
          <option value="mentor">Mentor</option>
          <option value="mentee">Mentee</option>
          <option value="group">Group Chat</option>
        </select>

        <div className="overlay-save-cancel-btn">

          <div className="bottom-left">
            <button className="red-button">
              Delete
            </button>
          </div>

          <div className="bottom-right">

            <button className="glass-buttons" onClick={closeOverlay}>
              Cancel
            </button>

            <button 
            className="blue-button"
            onClick={handleSave}>
              Save
            </button>

          </div>

        </div>

      </div>
    </div>
  );
}

export default CalendarReminderOverlay;