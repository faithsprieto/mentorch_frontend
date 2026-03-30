import "../styles/pagestyles/adminPage.css";
import "../styles/CommonButtonStyles.css";
import "../styles/CommonStyles.css";

import AdminNav from "../components/admin/adminNav";

export default function AdminPage() {
  const handleNavigation = (section) => {
    console.log("Go to:", section);
    // you can scroll, switch tabs, or route here
  };

  return (
    <div>
      <AdminNav onNavigate={handleNavigation} />
    </div>
  );
}