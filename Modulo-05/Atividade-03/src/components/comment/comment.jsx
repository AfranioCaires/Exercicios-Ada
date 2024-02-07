import Profile from "../profile/profile"
import "./comment.css"
export default function Comment ({user, content, picture}) {
  return (
    <article className="comment">
      <Profile name={user} picture={picture}/>
      <p className="commentText">{content}</p>
    </article>
  )
}