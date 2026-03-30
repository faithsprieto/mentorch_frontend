import { useState } from "react";
import { postRequest } from "../../utils/api"; // use your api.js
import "../../styles/CommonButtonStyles.css";

function EvaluationForm({ addEvaluation }) {
  const [form, setForm] = useState({
    student_id: "",
    role: "",
    rating: 0,
    comment: "",
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleRating = (value) => {
    setForm({
      ...form,
      rating: value,
    });
  };

  const handleSave = async () => {
    if (!form.student_id || !form.role || !form.rating) return;

    try {
      await postRequest("/evaluation/create", form); // FINAL FIX ENDPOINT ADD BACK END 

      // update UI
      if (addEvaluation) addEvaluation(form);

      // reset
      setForm({
        student_id: "",
        role: "",
        rating: 0,
        comment: "",
      });

    } catch (error) {
      console.error("Error saving evaluation:", error);
    }
  };

  return (
    <div className="evaluation-form">
      <label>ID:</label>
      <input
        type="text"
        name="student_id"
        value={form.student_id}
        onChange={handleChange}
      />

      <label>Role:</label>
      <input
        type="text"
        name="role"
        value={form.role}
        onChange={handleChange}
      />

      <label>Rating:</label>
      <div style={{ fontSize: "24px", cursor: "pointer" }}>
        {[1, 2, 3, 4, 5].map((star) => (
          <span
            key={star}
            onClick={() => handleRating(star)}
            style={{
              color: star <= form.rating ? "#FFD700" : "#ccc",
            }}
          >
            ★
          </span>
        ))}
      </div>

      <label>Comment:</label>
      <input
        type="text"
        name="comment"
        value={form.comment}
        onChange={handleChange}
      />

      <button onClick={handleSave}>Save</button>
    </div>
  );
}

export default EvaluationForm;