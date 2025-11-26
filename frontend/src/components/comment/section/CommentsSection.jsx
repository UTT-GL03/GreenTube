import { useState } from "react"
import Comment from "../Comment"
import { useData } from "../../../context/DataContext"

export function CommentsSection({ currentVideo }) {
  const { users, comments } = useData()
  
  const [input, setInput] = useState('')
  const [videoComments, setRelatedComments] = useState(() =>
    comments.filter(c => c.id_video === currentVideo._id)
  )

  const addComment = (currentUserId, currentVideoId) => {
    if (!input.trim()) return

    const newComment = {
      _id: `c${Date.now()}`,
      type: "comment",
      id_user: currentUserId,
      id_video: currentVideoId,
      date: new Date().toLocaleString(),
      content: input
    }

    setRelatedComments(prev => [newComment, ...prev])
    setInput('')
  }

  return (
    <div className="max-w-900 mx-1">
      <h2>Commentaires</h2>

      <div className="flex w-full my-1">
        <input
          className="flex-content input-text me-1"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          // TODO : modifie addComment user id
          onKeyDown={(e) => e.key === 'Enter' && addComment("u1", currentVideo._id)}
          placeholder="Ajouter un commentaire..."
        />

        <button
          className="btn"
          // TODO : modifie addComment user id
          onClick={() => addComment("u1", currentVideo._id)}
        >
          Publier
        </button>
      </div>

      <div className="overflow-y-sm w-full">
        <ul>
          {videoComments.map((c) => {
            let cUser = users.find(u => u._id === c.id_user)
            return (
              <Comment user={cUser} comment={c} />
            )
          })}
        </ul>
      </div>
    </div>
  )
}

export default CommentsSection