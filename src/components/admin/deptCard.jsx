import { useState } from "react";
import { postRequest, deleteRequest } from "../../utils/api";

import "../../styles/CommonButtonStyles.css";
import "../../styles/CommonStyles.css";

export default function DeptCard({ item, onRefresh }) {

  const [isEditing, setIsEditing] = useState(false);
  const [value, setValue] = useState(item.department_title || ""); // ✅ FIXED
  const [loading, setLoading] = useState(false);

  // 🗑 DELETE
  const handleDelete = async () => {
    if (!window.confirm("Delete this department?")) return;

    try {
      setLoading(true);

      await deleteRequest(`/department/delete/${item.department_id}`);

      alert("Department deleted");

      if (onRefresh) onRefresh();

    } catch (error) {
      console.error(error);
      alert("Failed to delete department");
    } finally {
      setLoading(false);
    }
  };

  // ✏️ EDIT
  const handleEdit = async () => {
    if (!value.trim()) {
      alert("Department cannot be empty");
      return;
    }

    try {
      setLoading(true);

      await postRequest("/department/update", {
        department_id: item.department_id,
        department_title: value.trim(), // ✅ FIXED FIELD
      });

      alert("Department updated");

      setIsEditing(false);

      if (onRefresh) onRefresh();

    } catch (error) {
      console.error(error);
      alert("Failed to update department");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="department-card"
      style={{ display: "flex", gap: "10px", alignItems: "center" }}
    >

      {/* TEXT / INPUT */}
      {isEditing ? (
        <input
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
      ) : (
        <span>{item.department_title}</span> // ✅ FIXED
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