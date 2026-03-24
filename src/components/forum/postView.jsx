import { useEffect, useState } from "react";

function PostView({ postId }) {

  const [post, setPost] = useState(null);

  useEffect(() => {

    fetch(`http://localhost:5000/posts/${postId}`)
      .then(res => res.json())
      .then(data => setPost(data));

  }, [postId]);

  if (!post) return <p>Loading...</p>;

  return (
    <div>

      <h2>{post.post_title}</h2>

      <p>{post.post_description}</p>

    </div>
  );
}

export default PostView;