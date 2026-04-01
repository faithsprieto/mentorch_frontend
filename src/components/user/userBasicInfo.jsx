import { useEffect, useState } from "react";
import { getRequest } from "../../utils/api.js";

export default function UserBasicInfo() {
  const [user, setUser] = useState(null);

  const placeholder = "https://via.placeholder.com/150x200?text=No+Image";

  useEffect(() => {
    const fetchUser = async () => {
      try {
        // ✅ Directly get user_id from localStorage
        const userId = localStorage.getItem("user");

        if (!userId) {
          console.error("❌ No user_id found in localStorage");
          return;
        }

        

        const data = await getRequest(`/user/profile/${userId}`);

        

        if (!data) {
          console.error("❌ No data returned from API");
          return;
        }

        setUser(data);
      } catch (err) {
        console.error("❌ Error fetching user:", err);
      }
    };

    fetchUser();
  }, []);

  if (!user) return <p>Loading...</p>;

  return (
    <div className="user-info">
      <img
        src={user.profile_picture ? user.profile_picture : placeholder}
        alt="user"
        className="user-image"
      />

      <div className="main-info">
        <h5 className="title">
          {user.first_name} {user.last_name}
        </h5>
        <p className="description">{user.school_email}</p>
      </div>
    </div>
  );
}