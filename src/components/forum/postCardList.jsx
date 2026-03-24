import { useEffect, useState } from "react";
import PostCard from "./postCard";

function PostCardList() {

  const [posts, setPosts] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/posts")
      .then(res => res.json())
      .then(data => setPosts(data));
  }, []);

  return (
    <div>
      {posts.map(post => (
        <PostCard key={post.post_id} post={post} />
      ))}
    </div>
  );
}

export default PostCardList;