import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import MentorchNav from "../components/mentorch/mentorchNav"; 
import MentorchCard from "../components/mentorch/mentorchCard"; 

import "../styles/pagestyles/mentorchipPage.css";
import "../styles/CommonButtonStyles.css";
import "../styles/CommonStyles.css";

export default function RequestPage() {

  const [searchInput, setSearchInput] = useState("");
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetch("http://localhost/mentorchcd4again4/public/admin/users") // adjust API if needed
      .then((res) => res.json())
      .then((data) => setUsers(data))
      .catch((err) => console.error(err));
  }, []);

  const filteredUsers = users.filter((user) =>
    `${user.first_name} ${user.last_name} ${user.course_program}`
      .toLowerCase()
      .includes(searchInput.toLowerCase())
  );

  return (

    <div className="requests">
    
      <div className="header">
        <h2>Requests</h2>
        <MentorchNav onNavigate={(section) => console.log(section)} />
      </div>

          <div className="card-sliders">
            <div className="swiper mentor-swiper">
              <div className="swiper-wrapper">

                {filteredUsers.map((user) => (
                  <RequestCard key={user.student_id} user={user} />
                ))}

              </div>
            </div>
          </div>

    </div>

  );
}