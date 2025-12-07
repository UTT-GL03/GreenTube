import VideoCard from "../card/VideoCard"

export function Recommendations({ related }) {
  return <div>
    <h3 className="text-center">Vidéos recommandées</h3>
    <div>
      {related.map(v =>
        <div>
          <VideoCard key={v._id} video={v} />
          <div className="spacer-2" />
        </div>
      )}
    </div>
  </div>
}

export default Recommendations