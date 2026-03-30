import { useState, useEffect } from "react";
import { getRequest } from "../utils/api";

export default function LibraryList({ refreshTrigger }) {
  const [files, setFiles] = useState([]);
  const [loading, setLoading] = useState(false);

  // ✅ FETCH LIBRARY FILES
  const fetchLibrary = async () => {
    try {
      setLoading(true);

      const res = await getRequest("/library");

      // ✅ ensure correct data structure
      setFiles(res.data || []);

    } catch (error) {
      console.error("Error fetching library:", error);
    } finally {
      setLoading(false);
    }
  };

  // ✅ load on mount + refresh
  useEffect(() => {
    fetchLibrary();
  }, [refreshTrigger]);

  return (
    <div>
      <h2>Library Files</h2>

      {loading ? (
        <p>Loading...</p>
      ) : files.length === 0 ? (
        <p>No files found</p>
      ) : (
        <div className="library-list">
          {files.map((file) => (
            <div
              key={file.library_id} // ✅ FIXED
              className="library-card"
            >
              <h4>{file.title}</h4>

              <p>Uploaded by: {file.user_id}</p>

              {/* ✅ FIX FILE PATH */}
              <a
                href={`${import.meta.env.VITE_BACKEND_URL}/${file.file}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                View File
              </a>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}