import { useContext, useMemo } from "react"

import { DataContext } from "../../../context/DataContext"

import VideoCard from "../card/VideoCard"

export function Recommendations({ currentVideo }) {
  const { videos } = useContext(DataContext)

  const related = useMemo(() => videos.filter(v => v.id_video !== currentVideo.id_video).slice(0, 3), [videos, currentVideo])
  return <div>
    <h3 className="text-center">Vidéos recommandées</h3>
    <div>
      {related.map(v => <div>
        <VideoCard key={v.id_video} video={v} />
        <div className="spacer-2" />
      </div>
      )}
    </div>
  </div>
}

export default Recommendations