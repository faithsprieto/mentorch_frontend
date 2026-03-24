
import AdminPanel from "../components/forum/adminPanel";

function ForumThreadsPage() {
  return (
    <div className="forum-container">

      <div className="forum-main">
        <ThreadsList />
      </div>

      <AdminPanel />

    </div>
  );
}

export default ForumThreadsPage;