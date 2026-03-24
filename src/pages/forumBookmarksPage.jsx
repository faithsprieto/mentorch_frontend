import BookmarkList from "../components/forum/bookmarkList";
import AdminPanel from "../components/forum/adminPanel";

function ForumBookmarksPage() {
  return (
    <div className="forum-container">

      <div className="forum-main">
        <BookmarkList />
      </div>

      <AdminPanel />

    </div>
  );
}

export default ForumBookmarksPage;