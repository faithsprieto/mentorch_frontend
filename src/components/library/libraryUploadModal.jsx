import { useState, useEffect, useRef } from "react";
import { postRequest, getRequest } from "../../utils/api";

export default function LibraryUploadModal({ onClose, onSuccess }) {
  const [formData, setFormData] = useState({
    title: "",
    keywords: [], // ✅ stores keyword_id
    file: null,
  });

  const [keywordList, setKeywordList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);

  const dropdownRef = useRef(null);

  // ✅ FETCH KEYWORDS
  useEffect(() => {
    fetchKeywords();
  }, []);

  const fetchKeywords = async () => {
    try {
      const res = await getRequest("/keyword/list");
      setKeywordList(res.data);
    } catch (error) {
      console.error("Error fetching keywords:", error);
    }
  };

  // ✅ CLOSE DROPDOWN WHEN CLICK OUTSIDE
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

  // ✅ INPUT HANDLER
  const handleChange = (e) => {
    const { name, value, files } = e.target;

    if (name === "file") {
      setFormData((prev) => ({ ...prev, file: files[0] }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  // ✅ TOGGLE USING keyword_id
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

  // ✅ SUBMIT
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.file) {
      alert("Please select a file");
      return;
    }

    const data = new FormData();

    // 🔥 GET USER ID FROM LOCAL STORAGE
    const user_id = localStorage.getItem("user");

    data.append("user_id", user_id);
    data.append("title", formData.title);
    data.append("file", formData.file);

    // 🔥 SEND keyword_id[]
    formData.keywords.forEach((id) => {
      data.append("keyword_id[]", id);
    });

    try {
      setLoading(true);

      const res = await postRequest("/library/upload", data, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      alert(res.message || "Upload request submitted!");
      onClose();

    } catch (error) {
      console.error(error);
      alert(
        error.response?.data?.message ||
        "Failed to submit upload request."
      );
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

        <h2>Request File Upload</h2>

        <form onSubmit={handleSubmit}>
          {/* TITLE */}
          <input
            type="text"
            name="title"
            placeholder="Title"
            value={formData.title}
            onChange={handleChange}
            required
          />

          {/* 🔥 DROPDOWN MULTI SELECT */}
          <div
            ref={dropdownRef}
            style={{ position: "relative", marginBottom: "12px" }}
          >
            {/* DISPLAY BOX */}
            <div
              onClick={() => setOpen((prev) => !prev)}
              style={{
                padding: "8px",
                border: "1px solid #ccc",
                borderRadius: "8px",
                cursor: "pointer",
                background: "#fff",
              }}
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

            {/* DROPDOWN */}
            {open && (
              <div
                style={{
                  position: "absolute",
                  top: "105%",
                  left: 0,
                  width: "100%",
                  background: "#fff",
                  border: "1px solid #ccc",
                  borderRadius: "8px",
                  maxHeight: "150px",
                  overflowY: "auto",
                  zIndex: 9999,
                  boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
                }}
              >
                {keywordList.map((k) => {
                  const selected = formData.keywords.includes(
                    Number(k.keyword_id)
                  );

                  return (
                    <div
                      key={k.keyword_id}
                      onClick={() =>
                        toggleKeyword(Number(k.keyword_id))
                      }
                      style={{
                        padding: "8px",
                        cursor: "pointer",
                        background: selected ? "#4338ca" : "#fff",
                        color: selected ? "#fff" : "#000",
                      }}
                    >
                      {k.keyword_tag}
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          {/* FILE */}
          <input
            type="file"
            name="file"
            onChange={handleChange}
            required
          />

          {/* SUBMIT */}
          <button type="submit" disabled={loading}>
            {loading ? "Submitting..." : "Submit Request"}
          </button>
        </form>
      </div>
    </div>
  );
}