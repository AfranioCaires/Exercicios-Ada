import Profile from "../profile/profile";
import "./createComment.css";
export default function CreateComment() {
  return (
    <div className="createCommentWrapper">
      <Profile name={"Você"} picture={"https://thispersondoesnotexist.com/"} />
      <textarea className="inputText" placeholder="Digite seu comentário..." />
      <div className="separator"></div>
      <div className="btn">
        <button type="submit" className="commentBtn">
          Comentar
        </button>
      </div>
    </div>
  );
}
