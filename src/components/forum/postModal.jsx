import { useState } from "react";

function PostModal({ close }) {

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const createPost = async () => {

    await fetch("http://localhost:5000/posts", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        student_id: 1,
        post_title: title,
        post_description: description
      })
    });

    close();
  };

  return (
    <div>

      <h3>Create Post</h3>

      <input
        placeholder="Title"
        onChange={(e) => setTitle(e.target.value)}
      />

      <textarea
        placeholder="Description"
        onChange={(e) => setDescription(e.target.value)}
      />

      <button onClick={createPost}>
        Post
      </button>

    </div>
  );
}

export default PostModal;