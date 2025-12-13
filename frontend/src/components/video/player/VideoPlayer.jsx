import { useState } from "react";
import { backApi } from "../../../api/backApi";
import { API } from "../../../constants/constants";

function VideoPlayer({ idVideo, path }) {
  const [hasCountedView, setHasCountedView] = useState(false);

  if (!path) return <p>Vidéo introuvable</p>;

  const incrementView = async () => {
    if (hasCountedView) return;
    setHasCountedView(true);

    const data = await backApi.incrementView(idVideo)
    if(!data.success){
      console.log(data.message);
    }
  };

  return (
    <video
      className="rounded-md"
      controls
      width="100%"
      src={`${API.URL}/${path}`}
      onPlay={incrementView}
    />
  );
}

export default VideoPlayer
