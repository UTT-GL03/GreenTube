import { useState } from 'react'

function UploadVideoModal({ onClose }) {
  const [name, setName] = useState('')
  const [desc, setDesc] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()

    onClose()
  }

  return (
    <>
      <div className="fixed inset-0 bg-black opacity-7 z-1000" onClick={onClose} />
      <div className="fixed inset-0 flex items-center justify-center z-2000">
        <div className="card-lg bg-white rounded p-2" onClick={(e) => e.stopPropagation()}>
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
                placeholder="Titre de la vidéo"
                required
              />

              <span className="fw-bold">Description</span>
              <textarea
                className="text-area"
                value={desc}
                onChange={e => setDesc(e.target.value)}
                placeholder="Décris brièvement ta vidéo"
              />

              <span className="fw-bold">Charger une vidéo</span>
              <input
                type="file"
                className="input-text"
                accept="video/*"
                placeholder="Sélection de fichier désactivée (mode statique)"
              />
            </div>
            <div className="flex justify-end mt-2 gap-2">
              <button
                type="button"
                className="btn"
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
    </>
  )
}

export default UploadVideoModal
