import { useState, useEffect } from "react";
import { SearchOutlined } from "@ant-design/icons";

import { getRequest } from "../utils/api";

import AdminNav from "../components/admin/adminNav";
import CourseCard from "../components/admin/courseCard";

import "../styles/pagestyles/adminPage.css";
import "../styles/CommonButtonStyles.css";
import "../styles/CommonStyles.css";

export default function CreateCoursePage() {

  const [searchInput, setSearchInput] = useState("");
  const [courses, setCourses] = useState([]); // ✅ FIXED

  const handleNavigation = (section) => {
    console.log("Go to:", section);
  };

  // ✅ FETCH COURSES
  const fetchCourses = async () => {
    try {
      const res = await getRequest("/course/list");
      setCourses(res.data || []);
    } catch (error) {
      console.error("Error fetching courses:", error);
    }
  };

  // ✅ LOAD ON MOUNT
  useEffect(() => {
    fetchCourses();
  }, []);

    const filteredCourses = courses.filter((item) =>
    item.course_title
        ?.toLowerCase()
        .includes(searchInput.toLowerCase())
    );

  return (
    <div className="admin-course">

      <div className="admin-header">
        <h2>Admin Dashboard</h2>
        <AdminNav onNavigate={handleNavigation} />
      </div>

      <div className="action-area">
        <h6>List of courses:</h6>

        <div className="search-container">
          <input
            type="text"
            placeholder="Search by course name..."
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
          />
          <SearchOutlined className="search-icon" />
        </div>
      </div>

      {/* DISPLAY */}
      <div className="courses-list">
        {filteredCourses.length === 0 ? (
          <p>No courses found</p> // ✅ fixed message
        ) : (
          filteredCourses.map((item) => (
            <CourseCard
              key={item.course_id} // ✅ FIXED
              item={item}
              onRefresh={fetchCourses}
            />
          ))
        )}
      </div>

    </div>
  );
}