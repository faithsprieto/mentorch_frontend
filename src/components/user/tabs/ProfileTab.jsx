export default function UserProfileTab({
  about,
  setAbout,
  strength,
  setStrength,
  weakness,
  setWeakness,
  goals,
  setGoals
}) {
  return (
    <>
      <h3>User Profile</h3>

      <div className="about-user">
        <h4>Tell me about yourself</h4>
        <input
          type="text"
          value={about}
          onChange={(e) => setAbout(e.target.value)}
        />
      </div>

      <div className="user-strength-weakness">
        <div className="user-strength">
          <h4>Strength</h4>
          <input
            type="text"
            value={strength}
            onChange={(e) => setStrength(e.target.value)}
          />
        </div>

        <div className="user-weakness">
          <h4>Weakness</h4>
          <input
            type="text"
            value={weakness}
            onChange={(e) => setWeakness(e.target.value)}
          />
        </div>
      </div>

      <div className="user-goals">
        <h4>State your goals</h4>
        <input
          type="text"
          value={goals}
          onChange={(e) => setGoals(e.target.value)}
        />
      </div>
    </>
  );
}