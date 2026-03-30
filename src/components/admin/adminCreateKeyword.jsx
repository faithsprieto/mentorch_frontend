import { useState } from "react";
import { postRequest } from "../../utils/api";

import "../../styles/CommonButtonStyles.css";
import "../../styles/CommonStyles.css";

export default function AdminCreateKeyword({ onSuccess }) {
  const [keyword, setKeyword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSave = async () => {
    if (!keyword.trim()) {
      alert("Keyword is required");
      return;
    }

    try {
      setLoading(true);

      const res = await postRequest("/keyword/create", {
        keyword: keyword.trim(),
      });

      alert(res?.message || "Keyword created successfully");

      setKeyword("");

      // ✅ refresh parent list
      if (onSuccess) onSuccess();

    } catch (error) {
      console.error("Error creating keyword:", error);
      alert(
        error?.response?.data?.message ||
        "Failed to create keyword"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h3>Create Keyword</h3>

      <h6>Name of keyword:</h6>

      <input
        type="text"
        placeholder="Enter keyword..."
        value={keyword}
        onChange={(e) => setKeyword(e.target.value)}
        disabled={loading}
      />

      <div className="bottom-right">
        <button
          className="blue-button"
          onClick={handleSave}
          disabled={loading}
        >
          {loading ? "Saving..." : "Save"}
        </button>
      </div>
    </div>
  );
}