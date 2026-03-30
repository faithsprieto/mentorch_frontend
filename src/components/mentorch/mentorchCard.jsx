//also used as request card in requests page

export default function MentorchCard({ user }) {
  return (
    <div className="swiper-slide">
      <div className="card">
        
        <div className="card-image">
          <img src={user.profile_picture} alt="user" />
          <p className="card-tag">Mentor</p>
        </div>

        <div className="card-content">
          <h5 className="card-user">
            {user.course_program}
          </h5>

          <p className="card-text">
            {user.department} • Year {user.year_level}
          </p>

          <div className="card-footer">
            <div className="card-profile">
              <img src={user.profile_picture} alt="" />

              <div className="card-profile-info">
                <span className="card-profile-name">
                  {user.first_name} {user.last_name}
                </span>
                <span className="card-profile-role">
                  Mentor
                </span>
              </div>
            </div>

            <a href="#" className="card-button">
              Send request!
            </a>
          </div>
        </div>

      </div>
    </div>
  );
}