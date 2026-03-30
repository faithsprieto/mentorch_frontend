import { useState, useMemo, useEffect } from "react";
import { Link } from "react-router-dom";
import { getRequest } from "../utils/api";

import LibraryControls from "../components/library/libraryControls";
import LibraryTable from "../components/library/libraryTable";
import LibraryUploadModal from "../components/library/libraryUploadModal";

import "../styles/pagestyles/libraryPage.css";
import "../styles/CommonButtonStyles.css";

export default function LibraryPage() {

  const [search, setSearch] = useState("");
  const [refresh, setRefresh] = useState(0);
  const [sort, setSort] = useState("");
  const [showUpload, setShowUpload] = useState(false);
  const [resources, setResources] = useState([]);

  // 🔥 FETCH LIBRARY FILES
  const fetchLibrary = async () => {
    try {
      const res = await getRequest("/library/files");

      // ✅ MAP BACKEND → FRONTEND FORMAT
      const formatted = res.data.map(item => ({
        id: item.id,
        title: item.title,
        owner: item.user_id, // or name if backend provides
        course: item.course || "N/A",
        upload_date: item.upload_date,
        file_type: item.file_type,
        file_path: item.file_path,

        // 🔥 if backend returns keywords as array
        keywords: item.keywords || [],
      }));

      setResources(formatted);

    } catch (error) {
      console.error("Error fetching library:", error);
    }
  };

  // ✅ LOAD ON PAGE OPEN
  useEffect(() => {
    fetchLibrary();
  }, []);

  // 🔍 FILTER + SORT
  const filteredResources = useMemo(() => {
    const lowerSearch = search.toLowerCase();

    let result = resources.filter(resource =>
      resource.course?.toLowerCase().includes(lowerSearch) ||
      resource.title?.toLowerCase().includes(lowerSearch) ||
      resource.owner?.toLowerCase().includes(lowerSearch) ||
      resource.keywords?.some(tag =>
        tag.toLowerCase().includes(lowerSearch)
      )
    );

    if (sort === "date") {
      result = [...result].sort(
        (a, b) => new Date(b.upload_date) - new Date(a.upload_date)
      );
    }

    if (sort === "alphabetical") {
      result = [...result].sort((a, b) =>
        (a.title || "").localeCompare(b.title || "")
      );
    }

    if (sort === "type") {
      result = [...result].sort((a, b) =>
        (a.file_type || "").localeCompare(b.file_type || "")
      );
    }

    return result;

  }, [search, sort, resources]);

  return (
    <div className="library-page">

      <h2>The Library</h2>

      <LibraryControls
        search={search}
        setSearch={setSearch}
        sort={sort}
        setSort={setSort}
      />

      <LibraryTable resources={filteredResources} />

      <div className="bottom-buttons">
        <div className="blue-button">
          <button onClick={() => setShowUpload(true)}>
            Upload your own file
          </button>
        </div>

        <div className="glass-buttons">
          <button>
            <Link to="/libraryArchivesPage">Take me to Archives</Link>
          </button>
        </div>
      </div>

      {showUpload && (
        <LibraryUploadModal
          onClose={() => setShowUpload(false)}
          onSuccess={() => setRefresh(prev => prev + 1)}
        />
      )}

    </div>
  );
}