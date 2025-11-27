// frontend/src/components/video/upload/UploadVideoModal.jsx
import { useState } from 'react'
import { useData } from '../../../context/DataContext'

function UploadVideoModal({ onClose }) {
  const { users } = useData()

  const [title, setTitle] = useState('')
  const [desc, setDesc] = useState('')
  const [channelId, setChannelId] = useState(users[0]?._id || '')

  const handleSubmit = (e) => {
    e.preventDefault()

    // 🧪 100 % statique : on ne modifie pas les données globales
    console.log('Fake upload:', {
      title,
      desc,
      channelId
    })

    onClose()
  }

  return (
    <div className="modal-overlay">
      <div className="modal">
        <div className="modal-header">
          <h2 className="modal-title">Mettre en ligne une vidéo</h2>
          <button
            type="button"
            className="btn circle-sm"
            onClick={onClose}
          >
            ×
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="modal-body">

            <label className="flex-col">
              <span className="fw-bold mb-1">Titre</span>
              <input
                className="modal-input"
                type="text"
                value={title}
                onChange={e => setTitle(e.target.value)}
                placeholder="Titre de la vidéo"
                required
              />
            </label>

            <label className="flex-col">
              <span className="fw-bold mb-1">Description</span>
              <textarea
                className="modal-textarea"
                value={desc}
                onChange={e => setDesc(e.target.value)}
                placeholder="Décris brièvement ta vidéo"
              />
            </label>

            <label className="flex-col">
                <span className="fw-bold mb-1">Charger une vidéo</span>
                <input
                    type="file"
                    className="modal-input"
                    accept="video/*"
                    disabled
                    placeholder="Sélection de fichier désactivée (mode statique)"
                />
            </label>

            {/* Plus tard : input type="file" si vous avez un backend */}
          </div>

          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-secondary"
              onClick={onClose}
            >
              Annuler
            </button>
            <button type="submit" className="btn">
              Mettre en ligne
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default UploadVideoModal
