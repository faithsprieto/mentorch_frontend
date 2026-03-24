import { useState, useEffect } from "react";
import MentorchCard from "../components/mentorch/mentorchCard"; 
import MentorchNav from "../components/mentorch/mentorchNav"; 
import { SearchOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";

import "../styles/pagestyles/mentorchipPage.css";
import "../styles/CommonButtonStyles.css";
import "../styles/CommonStyles.css";

export default function MentorchipPage() {
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

    <div className="mentorch-matching-area">
    
    <div className="header">
      <h2>MENTORCHIP</h2>
        <p className="hero-subtitle">
            where learners help learners
        </p>
      <MentorchNav onNavigate={(section) => console.log(section)} />
    </div>

{/*MENTOR ZONE*/}

  <section className="mentor-search">

          <h3 style={{ marginBottom: "10px", marginLeft: "180px" }}>
            Find your <i>mentors</i>
          </h3>

          <input
            type="text"
            id="searchInput"
            placeholder="Search by keyword, course, or title..."
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
          />
          <SearchOutlined className="search-icon" />

          <h4 style={{ marginLeft: "180px" }}>
            Potential Mentors for you:
          </h4>

          <div className="card-sliders">
            <div className="swiper mentor-swiper">
              <div className="swiper-wrapper">

                {filteredUsers.map((user) => (
                  <RequestCard key={user.student_id} user={user} />
                ))}

              </div>
            </div>
          </div>

  </section>
    


{/*MENTEE ZONE*/}

  <section className="mentee-search">

          <h3 style={{ marginBottom: "10px", marginLeft: "180px" }}>
            Find your <i>mentees</i>
          </h3>

          <input
            type="text"
            id="searchInput"
            placeholder="Search by keyword, course, or title..."
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
          />
          <SearchOutlined className="search-icon" />

          <h4 style={{ marginLeft: "180px" }}>
            Potential Mentors for you:
          </h4>

          <div className="card-sliders">
            <div className="swiper mentor-swiper">
              <div className="swiper-wrapper">

                {filteredUsers.map((user) => (
                  <RequestCard key={user.student_id} user={user} />
                ))}

              </div>
            </div>
          </div>

  </section>



{/*GC ZONE*/}  {/*TO BE EDITED */}
  <section className="gc-search">

          <h3 style={{ marginBottom: "10px", marginLeft: "180px" }}>
            Find your <i>study group</i>
          </h3>

          <input
            type="text"
            id="searchInput"
            placeholder="Search by keyword, course, or title..."
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
          />
          <SearchOutlined className="search-icon" />

          <h4 style={{ marginLeft: "180px" }}>
            Potential study groups for you:
          </h4>

          <div className="card-sliders">
            <div className="swiper mentor-swiper">
              <div className="swiper-wrapper">

                {filteredUsers.map((user) => (
                  <RequestCard key={user.student_id} user={user} />
                ))}

              </div>
            </div>
          </div>

  </section>


      </div>
    
  );
}