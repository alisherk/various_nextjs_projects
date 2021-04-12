import { useEffect, useState } from "react";
import CommentList from "./comment-list";
import NewComment from "./new-comment";
import classes from "./comments.module.css";

function Comments(props) {

  const { eventId } = props;

  const [comments, setComments] = useState([]);
  const [showComments, setShowComments] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    if (showComments) {
      fetch("/api/comments/" + eventId)
        .then((resp) => resp.json())
        .then((data) => setComments(data.comments));
    }
  }, [showComments]);

  function toggleCommentsHandler() {
    setShowComments((prevStatus) => !prevStatus);
  }

  async function addCommentHandler(commentData) {
    const resp = await fetch("/api/comments/" + eventId, {
      method: "POST",
      body: JSON.stringify(commentData),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await resp.json();
    setMessage(data.message);
  }

  return (
    <section className={classes.comments}>
      <p> {message}</p>
      <button onClick={toggleCommentsHandler}>
        {showComments ? "Hide" : "Show"} Comments
      </button>
      {showComments && <NewComment onAddComment={addCommentHandler} />}
      {showComments && <CommentList comments={comments} />}
    </section>
  );
}

export default Comments;
