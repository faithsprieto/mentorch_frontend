import React, { useState } from "react";
import "../../styles/CommonButtonStyles.css";
import "../../styles/CommonStyles.css";
import "../../styles/pagestyles/adminPage.css";

const API_BASE = "http://localhost/mentorchcd4again4/public/admin";

const AdminCreateAnnouncement = ({ onPostSuccess }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(null);

  const handleSubmit = async () => {
    if (!title || !description) {
      alert("Please fill in all fields");
      return;
    }

    const formData = new FormData();
    formData.append("department_id", 1);
    formData.append("title", title);
    formData.append("description", description);

    // ⚠️ TEMP FIX: send string instead of file
    formData.append("image", image ? image.name : "default.jpg");

    try {
      const response = await fetch(`${API_BASE}/createAnnouncements`, {
        method: "POST",
        body: formData,
      });

      const data = await response.json();

      if (data.status === "success") {
        alert("Announcement posted!");
        handleCancel();

        // 🔥 notify parent
        if (onPostSuccess) {
          onPostSuccess();
        }

        // 🔥 quick refresh to main page
        window.location.href = "/";
      }
    } catch (error) {
      console.error("Error posting announcement:", error);
    }
  };

  const handleCancel = () => {
    setTitle("");
    setDescription("");
    setImage(null);
  };

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
        <button onClick={handleSubmit}>Post</button>
      </div>
    </div>
  );
};

export default AdminCreateAnnouncement;