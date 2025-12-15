import { useState } from 'react'

import { backApi } from '../../../api/backApi';
import { useAuth } from '../../../contexts/AuthContext';
import { APP } from '../../../constants/constants';


function UploadVideoModal({ onClose }) {
  // HOOKs
  const { user } = useAuth();

  const [name, setName] = useState("");
  const [desc, setDesc] = useState("");
  const [video, setVideo] = useState(null);
  const [thumbnail, setThumbnail] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // FUNCTIONs
  const handleSubmit = async (e) => {
    setLoading(true);
    e.preventDefault();
    setError("");
    
    if (!video) {
      setError("Aucune vidéo sélectionné");
      console.log(error);
      return;
    }
    if (video.size > APP.VIDEO_MAX_SIZE * 1024 * 1024) {
      setError(`Fichier trop lourd. (MAX ${APP.VIDEO_MAX_SIZE} Mo)`);
      console.log(error);
      return;
    }

    if (thumbnail && thumbnail.size > APP.THUMBNAIL_MAX_SIZE * 1024 * 1024) {
      setError(`Fichier trop lourd. (MAX ${APP.THUMBNAIL_MAX_SIZE} Mo)`);
      console.log(error);
      return;
    }
    try {
      const formData = new FormData();

      formData.append("video", video);
      formData.append("thumbnail", thumbnail);
      formData.append("name", name);
      formData.append("desc", desc);
      formData.append("id_user", user._id);
      formData.append("user_name", user.name);
      formData.append("user_avatar", user.avatar)

      const data = await backApi.uploadVideo(formData);

      if (!data.success) {
        setError(data.message);
        return;
      }

      onClose()

      window.location.reload()
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
    <>
      <div className="fixed inset-0 bg-black-70 z-1000" onClick={onClose}>
        <div className="fixed inset-0 flex items-center justify-center z-2000">
          <div className="card-lg bg-white rounded-md p-2" onClick={(e) => e.stopPropagation()}>
            <div className="flex justify-between items-center">
              <h2 className="fs-bold fs-xl">Mettre en ligne une vidéo</h2>
              <button
                type="button"
                className="btn circle-sm"
                onClick={onClose}
              >
                ×
              </button>
            </div>
            <form onSubmit={handleSubmit}>
              <div className="flex flex-col gap-2 my-1">

                <span className="fw-bold">Titre</span>
                <input
                  className="input-text"
                  type="text"
                  value={name}
                  onChange={e => setName(e.target.value)}
                  placeholder="Titre de la vidéo..."
                  required
                />

                <span className="fw-bold">Description (Optionnel)</span>
                <textarea
                  className="text-area"
                  value={desc}
                  onChange={e => setDesc(e.target.value)}
                  placeholder="Décris brièvement ta vidéo..."
                />

                <span className="fw-bold">Charger une vidéo</span>
                <input
                  type="file"
                  className="input-text"
                  accept="video/*"
                  placeholder={`Sélectionner le fichier vidéo... (MAX ${APP.VIDEO_MAX_SIZE} Mo)`}
                  onChange={(e) => setVideo(e.target.files[0])}
                  required
                />

                <span className="fw-bold">Charger une miniature (Optionnel)</span>
                <input
                  type="file"
                  className="input-text"
                  accept="image/*"
                  placeholder={`Sélectionner le fichier image... (MAX ${APP.THUMBNAIL_MAX_SIZE} Mo)`}
                  onChange={(e) => setThumbnail(e.target.files[0])}
                />
              </div>
              {error ?? (
                <div className='center text-red'>
                  {error}
                </div>
              )}
              <div className="flex justify-end mt-2 gap-2">
                <button
                  type="button"
                  className="btn"
                  onClick={onClose}
                >
                  Annuler
                </button>
                <button type="submit" className="btn">
                  {loading ? "Chargement..." : "Mettre en ligne"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  )
}

export default UploadVideoModal
