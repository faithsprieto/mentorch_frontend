import { useState, useEffect } from "react";
import { SearchOutlined } from "@ant-design/icons";

import { getRequest } from "../utils/api";

import AdminNav from "../components/admin/adminNav";
import UserCard from "../components/admin/userCard";

import "../styles/pagestyles/adminPage.css";
import "../styles/CommonButtonStyles.css";
import "../styles/CommonStyles.css";

export default function AdminUsersPage() {

  const [searchInput, setSearchInput] = useState("");
  const [users, setUsers] = useState([]); // ✅ FIXED

  const handleNavigation = (section) => {
    console.log("Go to:", section);
  };

  // ✅ FETCH USERS
  const fetchUsers = async () => {
    try {
      const res = await getRequest("/user/list");
      setUsers(res.data || []);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  // ✅ LOAD ON MOUNT
  useEffect(() => {
    fetchUsers();
  }, []);

  // ✅ FILTER (SAFE VERSION)
  const filteredUsers = users.filter((item) => {
    const search = searchInput.toLowerCase();

    return (
      item.student_id?.toString().includes(search) || // ✅ number safe
      item.first_name?.toLowerCase().includes(search) ||
      item.last_name?.toLowerCase().includes(search) ||
      item.school_email?.toLowerCase().includes(search)
    );
  });

  return (
    <div className="admin-user">

      <div className="admin-header">
        <h2>Admin Dashboard</h2>
        <AdminNav onNavigate={handleNavigation} />
      </div>

      <div className="action-area">
        <h6>List of users:</h6>

        {/* SEARCH */}
        <div className="search-container">
          <input
            type="text"
            placeholder="Search by user..."
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
          />
          <SearchOutlined className="search-icon" />
        </div>
      </div>

      {/* DISPLAY */}
      <div className="users-list">
        {filteredUsers.length === 0 ? (
          <p>No users found</p>
        ) : (
          filteredUsers.map((item) => (
            <UserCard
              key={item.student_id}
              item={item}
              onRefresh={fetchUsers}
            />
          ))
        )}
      </div>

    </div>
  );
}