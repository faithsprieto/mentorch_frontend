import { useState, useEffect } from "react";
import { SearchOutlined } from "@ant-design/icons";

import { getRequest } from "../utils/api";

import AdminNav from "../components/admin/adminNav";
import AdminCreateDept from "../components/admin/adminCreateDept";
import DeptCard from "../components/admin/deptCard"; // ✅ correct

import "../styles/pagestyles/adminPage.css";
import "../styles/CommonButtonStyles.css";
import "../styles/CommonStyles.css";

export default function CreateDeptPage() {

  const [searchInput, setSearchInput] = useState("");
  const [departments, setDepartments] = useState([]);

  const handleNavigation = (section) => {
    console.log("Go to:", section);
  };

  // FETCH
  const fetchDepartments = async () => {
    try {
      const res = await getRequest("/department/list");
      setDepartments(res.data || []);
    } catch (error) {
      console.error("Error fetching departments:", error);
    }
  };

  // LOAD
  useEffect(() => {
    fetchDepartments();
  }, []);

  // FILTER (✅ FIXED FIELD)
  const filteredDepartments = departments.filter((item) =>
    item.department_title
      ?.toLowerCase()
      .includes(searchInput.toLowerCase())
  );

  return (
    <div className="admin-departments">

      <div className="admin-header">
        <h2>Admin Dashboard</h2>
        <AdminNav onNavigate={handleNavigation} />
      </div>

      {/* CREATE */}
      <AdminCreateDept onSuccess={fetchDepartments} />

      <div className="action-area">
        <h6>List of departments:</h6>

        <div className="search-container">
          <input
            type="text"
            placeholder="Search by department..."
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
          />
          <SearchOutlined className="search-icon" />
        </div>
      </div>

      {/* DISPLAY */}
      <div className="department-list">
        {filteredDepartments.length === 0 ? (
          <p>No departments found</p>
        ) : (
          filteredDepartments.map((item) => (
            <DeptCard
              key={item.department_id}
              item={item}
              onRefresh={fetchDepartments}
            />
          ))
        )}
      </div>

    </div>
  );
}