import { useState, useEffect } from "react";
import { SearchOutlined } from "@ant-design/icons";

import { getRequest } from "../utils/api";

import AdminNav from "../components/admin/adminNav";
import AdminCreateKeyword from "../components/admin/adminCreateKeyword";
import KeywordCard from "../components/admin/keywordCard";

import "../styles/pagestyles/adminPage.css";
import "../styles/CommonButtonStyles.css";
import "../styles/CommonStyles.css";

export default function CreateKeywordPage() {
  const [searchInput, setSearchInput] = useState("");
  const [keywords, setKeywords] = useState([]);

  const handleNavigation = (section) => {
    console.log("Go to:", section);
  };

  // ✅ FETCH KEYWORDS
  const fetchKeywords = async () => {
    try {
      const res = await getRequest("/keyword/list");

      // ✅ backend format: { status, data }
      setKeywords(res.data);

    } catch (error) {
      console.error("Error fetching keywords:", error);
    }
  };

  // ✅ load on mount
  useEffect(() => {
    fetchKeywords();
  }, []);

  // ✅ FILTER (use correct field name)
  const filteredKeywords = keywords.filter((item) =>
    item.keyword_tag
      ?.toLowerCase()
      .includes(searchInput.toLowerCase())
  );

  return (
    <div>
      <h3>Admin Dashboard</h3>
      <AdminNav onNavigate={handleNavigation} />

      {/* ✅ CREATE COMPONENT */}
      <AdminCreateKeyword onSuccess={fetchKeywords} />

      <h6>List of keywords:</h6>

      <div className="action-area">
        <input
          type="text"
          placeholder="Search by keyword..."
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
        />

        <SearchOutlined className="search-icon" />
      </div>

      {/* ✅ DISPLAY LIST */}
      <div className="keyword-list">
        {filteredKeywords.length === 0 ? (
          <p>No keywords found</p>
        ) : (
          filteredKeywords.map((item) => (
          <KeywordCard
            key={item.keyword_id}
            item={item}
            onRefresh={fetchKeywords}
          />
        ))
        )}
      </div>
    </div>
  );
}