import { useState } from "react";
import { postRequest, deleteRequest } from "../../utils/api";

import "../../styles/CommonButtonStyles.css";
import "../../styles/CommonStyles.css";

export default function UserCard({ item, onRefresh }) {

  const [isEditing, setIsEditing] = useState(false);
  const [value, setValue] = useState(item.school_email || ""); // ✅ editable field
  const [loading, setLoading] = useState(false);

  // 🗑 DELETE USER
  const handleDelete = async () => {
    if (!window.confirm("Delete this user?")) return;

    try {
      setLoading(true);

      await deleteRequest(`/user/delete/${item.student_id}`);

      alert("User deleted");

      if (onRefresh) onRefresh();

    } catch (error) {
      console.error(error);
      alert("Failed to delete user");
    } finally {
      setLoading(false);
    }
  };

  // ✏️ EDIT USER (example: update email)
  const handleEdit = async () => {
    if (!value.trim()) {
      alert("Email cannot be empty");
      return;
    }

    try {
      setLoading(true);

      await postRequest("/user/update", {
        student_id: item.student_id,
        school_email: value.trim(),
      });

      alert("User updated");

      setIsEditing(false);

      if (onRefresh) onRefresh();

    } catch (error) {
      console.error(error);
      alert("Failed to update user");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="user-card"
      style={{ display: "flex", gap: "10px", alignItems: "center" }}
    >

      {/* USER INFO */}
      <div>
        <strong>
          {item.first_name} {item.last_name}
        </strong>

        <br />

        {isEditing ? (
          <input
            value={value}
            onChange={(e) => setValue(e.target.value)}
          />
        ) : (
          <span>{item.school_email}</span>
        )}

        <br />
        <small>ID: {item.student_id}</small>
      </div>

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