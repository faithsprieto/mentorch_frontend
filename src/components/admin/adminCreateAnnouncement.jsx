import React, { useState } from "react";
import { postRequest } from "../../utils/api.js";

import "../../styles/CommonButtonStyles.css";
import "../../styles/CommonStyles.css";
import "../../styles/pagestyles/adminPage.css";

const AdminCreateAnnouncement = ({ onPostSuccess }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (!title || !description) {
      alert("Please fill in all fields");
      return;
    }

    const formData = new FormData();
    formData.append("department_id", 1);
    formData.append("title", title);
    formData.append("description", description);

    // TEMP: still sending filename only (like your current backend expects)
    formData.append("image", image ? image.name : "default.jpg");

    try {
      setLoading(true);

      const data = await postRequest(
        "/admin/createAnnouncements",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (data.status === "success") {
        alert("Announcement posted!");
        handleCancel();

        if (onPostSuccess) {
          onPostSuccess();
        }

        // optional redirect
        window.location.href = "/";
      }
    } catch (error) {
      console.error("Error posting announcement:", error);
      alert("Failed to post announcement");
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    setTitle("");
    setDescription("");
    setImage(null);
  };

  //add for delete

  return (
    <div className="announcement-container">
      <h2>Create Announcement</h2>

      <label>Title</label>
      <input
        type="text"
        placeholder="Enter title..."
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      <label>Description</label>
      <textarea
        placeholder="Write your announcement..."
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />

      <input
        type="file"
        onChange={(e) => setImage(e.target.files[0])}
      />

      <div className="button-group">
        <button onClick={handleCancel}>Cancel</button>
        <button onClick={handleSubmit} disabled={loading}>
          {loading ? "Posting..." : "Post"}
        </button>
      </div>
    </div>
  );
};

export default AdminCreateAnnouncement;