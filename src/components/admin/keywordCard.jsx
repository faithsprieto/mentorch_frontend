import { useState } from "react";
import { postRequest, deleteRequest } from "../../utils/api";

import "../../styles/CommonButtonStyles.css";
import "../../styles/CommonStyles.css";

export default function KeywordCard({ item, onRefresh }) {
  const [isEditing, setIsEditing] = useState(false);
  const [value, setValue] = useState(item.keyword_tag);
  const [loading, setLoading] = useState(false);

  // 🗑 DELETE
  const handleDelete = async () => {
    if (!window.confirm("Delete this keyword?")) return;

    try {
      setLoading(true);

      await deleteRequest(`/keyword/delete/${item.keyword_id}`);

      alert("Keyword deleted");

      if (onRefresh) onRefresh();

    } catch (error) {
      console.error(error);
      alert("Failed to delete keyword");
    } finally {
      setLoading(false);
    }
  };

  // ✏️ EDIT
  const handleEdit = async () => {
    if (!value.trim()) {
      alert("Keyword cannot be empty");
      return;
    }

    try {
      setLoading(true);

      await postRequest("/keyword/update", {
        keyword_id: item.keyword_id,
        keyword: value.trim(),
      });

      alert("Keyword updated");

      setIsEditing(false);

      if (onRefresh) onRefresh();

    } catch (error) {
      console.error(error);
      alert("Failed to update keyword");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="keyword-card" style={{ display: "flex", gap: "10px", alignItems: "center" }}>
      
      {/* TEXT / INPUT */}
      {isEditing ? (
        <input
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
      ) : (
        <span>{item.keyword_tag}</span>
      )}

      {/* BUTTONS */}
      <div style={{ marginLeft: "auto", display: "flex", gap: "8px" }}>
        
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