import Avatar from "../Avatar"
import "./Comment.css"

function Comment({ user, comment }) {
    return (
        <div className="comment">
            <Avatar user={user}/>
            <div className="comment-body">
                <div className="comment-header">
                    <span className="comment-username">{user.pseudo}</span>
                    <span className="comment-date">{comment.date}</span>
                </div>
                <p className="comment-content">{comment.content}</p>
            </div>
        </div>
    )
}

export default Comment