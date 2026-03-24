import PostView from "../components/forum/postView";
import AdminPanel from "../components/forum/adminPanel";
import { useParams } from "react-router-dom";

function ForumViewPostPage() {

  const { id } = useParams();

  return (
    <div className="forum-container">

      <div className="forum-main">
        <PostView postId={id} />
        <CommentInput postId={id} />
      </div>

      <AdminPanel />

    </div>
  );
}

export default ForumViewPostPage;