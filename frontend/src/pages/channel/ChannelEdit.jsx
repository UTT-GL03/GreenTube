import { useState, useEffect } from "react";
import { backApi } from "../../api/backApi";
import { useAuth } from "../../contexts/AuthContext";
import { Link, useNavigate } from "react-router";
import Avatar from "../../components/avatar/Avatar";

const AVATAR_MAX_SIZE = 5;

function ChannelEdit() {
  // HOOKs
  const { user, login } = useAuth();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [newDesc, setNewDesc] = useState(user?.desc ?? "");
  const [newAvatar, setNewAvatar] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(user?.avatar);

  useEffect(() => {
    if (!user) {
      navigate("/");
    }

    if (!newAvatar) {
      setPreviewUrl(user?.avatar);
      return;
    }
    const url = URL.createObjectURL(newAvatar);
    setPreviewUrl(url);

    return () => URL.revokeObjectURL(url);
  }, [newAvatar]);

  // FUNCTIONs
  const handleSubmit = async (e) => {
    setLoading(true);
    e.preventDefault();
    setError("");

    if (newAvatar && newAvatar.size > AVATAR_MAX_SIZE * 1024 * 1024) {
      setError(`Fichier trop lourd. (MAX ${AVATAR_MAX_SIZE} Mo)`);
      return;
    }

    try {
      const formData = new FormData();
      formData.append("newDesc", newDesc);
      if (newAvatar) formData.append("avatar", newAvatar);

      const data = await backApi.editChannel(user?._id, formData);

      if (!data.success) {
        setError(data.message);
        return;
      }

      // Maj du user dans le context
      login(data.user)

      navigate(`/channel/${data.user._id}`)
    }
    catch (err) {
      setError(err.message);
    }
    finally {
      setLoading(false)
    }
  }

  //
  return (
    <div className="card-lg mx-auto my-4">
      <h1 className="fs-xl mb-2">
        Modifier votre profil
      </h1>
      <p className="text-gray mb-3">
        Vous pouvez mettre à jour votre photo de profil ainsi que votre description de chaîne
      </p>

      <div className="flex items-center gap-2 mb-3">
        <Avatar avatarPath={previewUrl} size={"lg"} isPreview={ newAvatar } />
        <div>
          <label className="block">
            Avatar
          </label>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setNewAvatar(e.target.files[0])}
          />
          <p className="fs-sm text-gray mt-1">
            Recommandé : image carrée, au moins 256×256 px.
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="flex flex-col my-1">
          <label>
            Description :
          </label>
          <textarea
            value={newDesc}
            onChange={(e) => setNewDesc(e.target.value)}
            className="text-area mt-1"
            placeholder="Décris ta chaîne, le type de contenu que tu crées, etc..."
          />
        </div>
        {error && (
          <div className="text-center text-red mb-1">{error}</div>
        )}
        <div className="flex justify-end gap-2 mt-1">
          <Link
            to={`/channel/${user?._id ?? ""}`}
            className="btn"
          >
            Annuler
          </Link>
          <button
            type="submit"
            className="btn"
          >
            {loading ? (
              "Chargement..."
            ) : (
              "Valider"
            )}

          </button>
        </div>
      </form>
    </div>
  );
}

export default ChannelEdit