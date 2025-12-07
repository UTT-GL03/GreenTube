import { useState } from "react"
import Comment from "../Comment"

export function CommentsSection({ comments, addComment }) { 
  const [input, setInput] = useState('')

  // TODO : AuthContext
  let loggedUser = localStorage.getItem("user")

  if (typeof loggedUser === "string") {
    try {
      loggedUser = JSON.parse(loggedUser);
    } catch {
      return null;
    }
  }

  return (
    <div className="max-w-900 mx-1">
      <h2>Commentaires</h2>

      {loggedUser ? (

        <div className="flex w-full my-1">
          <input
            className="flex-content input-text me-1"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            // TODO : modifie addComment user id
            //onKeyDown={(e) => e.key === 'Enter' && addComment(loggedUser._id, "1")}
            placeholder="Ajouter un commentaire..."
          />

          <button
            className="btn"
            // TODO : modifie addComment user id
            //onClick={() => addComment(loggedUser._id, "1")}
          >
            Publier
          </button>
        </div>
      ) : (
        ""
      )}

      <div className="overflow-y-sm w-full">
        <ul>
          {comments.map((c) => {
            return (
              <Comment comment={c} />
            )
          })}
        </ul>
      </div>
    </div>
  )
}

export default CommentsSection