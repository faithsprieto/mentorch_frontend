import { useNavigate } from "react-router-dom";

function PostCard({ post }) {

  const navigate = useNavigate();

  return (
    <div
      className="post-card"
      onClick={() => navigate(`/forum/post/${post.post_id}`)}
    >

      <img
        src={`http://localhost:5000/${post.profile_picture}`}
        alt="profile"
        onError={(e) => {
            e.target.src = "/default-avatar.png";
        }}
      />
      <h4>{post.first_name} {post.last_name}</h4>

      <h3>{post.post_title}</h3>

      <p>{post.post_description}</p>

      <small>{post.date_time}</small>

    </div>
  );
}

export default PostCard;