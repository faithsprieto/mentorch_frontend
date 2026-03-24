import "../styles/pagestyles/adminPage.css";
import "../styles/CommonButtonStyles.css";
import "../styles/CommonStyles.css";

import AdminCreateAnnouncement from "../components/admin/adminCreateAnnouncement";
import AdminNav from "../components/admin/adminNav";

export default function AdminCreateAnnouncementPage() {
  const handleNavigation = (section) => {
    console.log("Go to:", section);
  };

  const handlePostSuccess = () => {
    console.log("Announcement created!");
  };

  return (
    <div className="admin-page-container">
      <h1>Admin Dashboard</h1>

      <AdminNav onNavigate={handleNavigation} />

      <div>
        <h2>Admin Announcements</h2>
        <AdminCreateAnnouncement onPostSuccess={handlePostSuccess} />
      </div>
    </div>
  );
}