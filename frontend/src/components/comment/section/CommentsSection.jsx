import { useState } from "react"
import Comment from "../Comment"
import { useData } from "../../../context/DataContext"

export function CommentsSection({ currentVideo }) {
  const { users, comments } = useData

  const [input, setInput] = useState('')
  const [videoComments, setRelatedComments] = useState(() =>
    comments.filter(c => c.id_video === currentVideo.id_video)
  )

  const addComment = (currentUserId, currentVideoId) => {
    if (!input.trim()) return

    const newComment = {
      id_comments: `c${Date.now()}`,
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
          onKeyDown={(e) => e.key === 'Enter' && addComment("u1", currentVideo.id_video)}
          placeholder="Ajouter un commentaire..."
        />

        <button
          className="btn"
          // TODO : modifie addComment user id
          onClick={() => addComment("u1", currentVideo.id_video)}
        >
          Publier
        </button>
      </div>

      <div className="overflow-y-sm w-full">
        <ul>
          {videoComments.map((c) => {
            let cUser = users.find(u => u.id_user === c.id_user)
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