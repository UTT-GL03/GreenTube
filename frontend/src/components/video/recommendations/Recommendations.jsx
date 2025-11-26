import { useMemo } from "react"

import { useData } from "../../../context/DataContext"

import VideoCard from "../card/VideoCard"

export function Recommendations({ currentVideo }) {
  const { videos } = useData()

  const related = useMemo(() => videos.filter(v => v._id !== currentVideo._id).slice(0, 3), [videos, currentVideo])
  return <div>
    <h3 className="text-center">Vidéos recommandées</h3>
    <div>
      {related.map(v => <div>
        <VideoCard key={v._id} video={v} />
        <div className="spacer-2" />
      </div>
      )}
    </div>
  </div>
}

export default Recommendations