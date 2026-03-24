import { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import LibraryControls from "../components/library/libraryControls";
import LibraryTable from "../components/library/libraryTable";
import LibraryUploadModal from "../components/library/libraryUploadModal";

import "../styles/pagestyles/libraryPage.css";
import "../styles/CommonButtonStyles.css";

export default function LibraryPage() {

  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("");
  const [showUpload, setShowUpload] = useState(false);

  const [resources, setResources] = useState([]);

  const filteredResources = useMemo(() => {

    const lowerSearch = search.toLowerCase();

    // FILTER
    let result = resources.filter(resource =>
      resource.course?.toLowerCase().includes(lowerSearch) ||
      resource.title?.toLowerCase().includes(lowerSearch) ||
      resource.owner?.toLowerCase().includes(lowerSearch) ||
      resource.keywords?.some(tag =>
        tag.toLowerCase().includes(lowerSearch)
      )
    );

    // SORT
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
            />
          )}

        

      </div>
    );
}