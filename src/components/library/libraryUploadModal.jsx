
import { useState } from "react";

export default function LibraryUploadModal({ onClose }) {

  const [formData, setFormData] = useState({
    title: "",
    keywords: "",
    file: null
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;

    if (name === "file") {
      setFormData(prev => ({ ...prev, file: files[0] }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = new FormData();
    data.append("title", formData.title);
    data.append("keywords", formData.keywords);
    data.append("file", formData.file);

    // await postRequest("/library/request-upload", data);

    alert("Upload request submitted for approval.");
    onClose();
  };

  const styles = {

    h6: {
      color: "black",
      justifyContent: "center",
      alignText: "center",
      fontSize: "2.5rem",
      margin: "0",
      marginBottom: "0.5rem"
    },

    input: {
      alignItems: "center",
      width: "23rem",
      padding: "0.3rem 0.5rem",
      borderRadius: "8px",
      border: "1px solid #ccc",
      fontSize: "1rem",
      marginBottom: "0.5rem"
    }

  };

  return (
    <div className="upload-overlay">

      <div className="upload-modal">

        <button
          className="close-btn"
          onClick={onClose}
        >
          X
        </button>

        <h6
          style={styles.h6}
        >
          Request File Upload
        </h6>

        <form onSubmit={handleSubmit}>

          <input
            style={styles.input}
            type="text"
            name="title"
            placeholder="Title"
            value={formData.title}
            onChange={handleChange}
            required
          />

          <input
            style={styles.input}
            type="text"
            name="keywords"
            placeholder="Keyword tags"
            value={formData.keywords}
            onChange={handleChange}
          />

          <input
            type="file"
            name="file"
            onChange={handleChange}
            required
          />

          <button type="submit">
            Submit Request
          </button>

        </form>
      
      </div>

    </div>
  );

}