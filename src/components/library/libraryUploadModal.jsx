import { useState, useEffect, useRef } from "react";
import { postRequest, getRequest } from "../../utils/api";
import "../../styles/pagestyles/libraryPage.css";

export default function LibraryUploadModal({ onClose, onSuccess }) {
  const [formData, setFormData] = useState({
    title: "",
    keywords: [],
    file: null,
  });

  const [keywordList, setKeywordList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);

  const dropdownRef = useRef(null);

  // FETCH KEYWORDS
  useEffect(() => {
    fetchKeywords();
  }, []);

  const fetchKeywords = async () => {
    try {
      const res = await getRequest("/keyword/list");
      setKeywordList(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  // CLOSE DROPDOWN WHEN CLICK OUTSIDE
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () =>
      document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleChange = (e) => {
    const { name, value, files } = e.target;

    if (name === "file") {
      setFormData((prev) => ({ ...prev, file: files[0] }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const toggleKeyword = (keyword_id) => {
    setFormData((prev) => {
      const exists = prev.keywords.includes(keyword_id);

      return {
        ...prev,
        keywords: exists
          ? prev.keywords.filter((k) => k !== keyword_id)
          : [...prev.keywords, keyword_id],
      };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.file) {
      alert("Please select a file");
      return;
    }

    const data = new FormData();

    const user_id = localStorage.getItem("user");

    data.append("user_id", user_id);
    data.append("title", formData.title);
    data.append("file", formData.file);

    formData.keywords.forEach((id) => {
      data.append("keyword_id[]", id);
    });

    try {
      setLoading(true);

      const res = await postRequest("/library/upload", data, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      alert(res.message || "Upload submitted!");

      if (onSuccess) onSuccess();
      onClose();

    } catch (error) {
      console.error(error);
      alert("Upload failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="upload-overlay">
      <div className="upload-modal">
        <button className="close-btn" onClick={onClose}>
          X
        </button>

        <h3>Request File Upload</h3>

        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="title"
            placeholder="Title"
            value={formData.title}
            onChange={handleChange}
            required
          />

          {/* 🔥 DROPDOWN */}
          <div className="drop-down" ref={dropdownRef}>
            <div
              className="display-box"
              onClick={() => setOpen((prev) => !prev)}
            >
              {formData.keywords.length > 0
                ? formData.keywords
                    .map((id) => {
                      const found = keywordList.find(
                        (k) => Number(k.keyword_id) === Number(id)
                      );
                      return found?.keyword_tag;
                    })
                    .join(", ")
                : "Select keywords"}
            </div>

            {open && (
              <div className="drop-down-box">
                {keywordList.map((k) => (
                  <div
                    key={k.keyword_id}
                    className="keyword-show"
                    onClick={() =>
                      toggleKeyword(Number(k.keyword_id))
                    }
                  >
                    {k.keyword_tag}
                  </div>
                ))}
              </div>
            )}
          </div>

          <input
            type="file"
            name="file"
            onChange={handleChange}
            required
          />

          <button type="submit" disabled={loading}>
            {loading ? "Submitting..." : "Submit"}
          </button>
        </form>
      </div>
    </div>
  );
}