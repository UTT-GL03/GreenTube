import { Link } from "react-router";
import { useState } from "react"
import { useAuth } from "../../../contexts/AuthContext"
import { backApi } from "../../../api/backApi";
import Comment from "../Comment"

export function CommentsSection({ comments, id_video }) {
  const [videoComments, setVideoComments] = useState(comments);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState("")
  const { user } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;
    setLoading(true)
    setMessage("")
    try {
      const res = await backApi.addComment({
        content: input,
        id_video,
        id_user: user._id,
        user_name: user.name,
        user_avatar: user.avatar
      });

      if (!res.success) {
        setMessage(res.message);
        return;
      }

      setVideoComments(prev => [res.data.comment, ...prev])
      setInput('')
    }
    catch (err) {
      setMessage(err.message);
    }
    finally {
      setLoading(false)
    }
  };

  return (
    <div className="max-w-900 mx-1">
      <h2>Commentaires</h2>

      {user ? (
        <>
          {message && (<span className="text-red">{message}</span>)}
          <form className="flex w-full my-1" onSubmit={handleSubmit}>
            <input
              className="flex-content input-text me-1"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ajouter un commentaire..."
            />

            <button
              type="submit"
              className="btn"
            >
              {loading ? (
                "Chargement..."
              ) : (
                "Publier"
              )}
            </button>
          </form>
        </>
      ) : (
        <span className="mx-2 mb-1">
          Vous êtes actuellement déconnecté, pour écrire un commentaire, veuillez
          <Link to={"/register"}> créer un compte </Link>
          ou vous
          <Link to={"/login"}> connecter</Link>.
        </span>
      )}

      <div className="overflow-y-sm w-full">
        <ul>
          {videoComments.map((c) => {
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