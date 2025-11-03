import "./Comment.css"

function Comment({ username, content, date }) {
    let avatar = ""

    return (
        <div className="comment">
            <img className="comment-avatar" src={avatar} alt={`${username} avatar`} />
            <div className="comment-body">
                <div className="comment-header">
                    <span className="comment-username">{username}</span>
                    <span className="comment-date">{date}</span>
                </div>
                <p className="comment-content">{content}</p>
            </div>
        </div>
    )
}

export default Comment