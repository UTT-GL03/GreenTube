// TODO : Mettre dans un fichier .env ou config.json
const API_URL = "http://localhost:3000";

function VideoPlayer({ path }) {
  if (!path) return <p>Vidéo introuvable</p>;

  const src = path.startsWith("/")
    ? `${API_URL}${path}`
    : `${API_URL}/${path}`;

  return (
    <video
      className="rounded"
      controls
      width="100%"
      src={src}
    />
  );
}

export default VideoPlayer
