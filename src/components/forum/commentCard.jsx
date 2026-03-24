function CommentCard({ comment }) {

  return (
    <div className="comment-card">

      <p>{comment.comment_description}</p>

      <small>{comment.date_time}</small>

    </div>
  );
}

export default CommentCard;