import { useState } from "react";
import { postRequest, deleteRequest } from "../../utils/api";

import "../../styles/CommonButtonStyles.css";
import "../../styles/CommonStyles.css";

export default function CourseCard({ item, onRefresh }) {

  const [isEditing, setIsEditing] = useState(false);
  const [value, setValue] = useState(item.course_title || ""); // ✅ CORRECT FIELD
  const [loading, setLoading] = useState(false);

  // 🗑 DELETE
  const handleDelete = async () => {
    if (!window.confirm("Delete this course?")) return;

    try {
      setLoading(true);

      await deleteRequest(`/course/delete/${item.course_id}`);

      alert("Course deleted");

      if (onRefresh) onRefresh();

    } catch (error) {
      console.error(error);
      alert("Failed to delete course");
    } finally {
      setLoading(false);
    }
  };

  // ✏️ EDIT
  const handleEdit = async () => {
    if (!value.trim()) {
      alert("Course title cannot be empty");
      return;
    }

    try {
      setLoading(true);

      await postRequest("/course/update", {
        course_id: item.course_id,
        course_title: value.trim(), // ✅ CORRECT FIELD
      });

      alert("Course updated");

      setIsEditing(false);

      if (onRefresh) onRefresh();

    } catch (error) {
      console.error(error);
      alert("Failed to update course");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="course-card"
      style={{ display: "flex", gap: "10px", alignItems: "center" }}
    >

      {/* TEXT / INPUT */}
      {isEditing ? (
        <input
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
      ) : (
        <div>
          <strong>{item.course_title}</strong> {/* ✅ FIXED */}
          <br />
          <small>Dept ID: {item.department_id}</small>
        </div>
      )}

      {/* BUTTONS */}
      <div
        style={{
          marginLeft: "auto",
          display: "flex",
          gap: "8px"
        }}
      >

        {isEditing ? (
          <>
            <button
              className="blue-button"
              onClick={handleEdit}
              disabled={loading}
            >
              Save
            </button>

            <button
              className="glass-buttons"
              onClick={() => setIsEditing(false)}
            >
              Cancel
            </button>
          </>
        ) : (
          <>
            <button
              className="glass-buttons"
              onClick={() => setIsEditing(true)}
            >
              Edit
            </button>

            <button
              className="red-button"
              onClick={handleDelete}
              disabled={loading}
            >
              Delete
            </button>
          </>
        )}

      </div>
    </div>
  );
}