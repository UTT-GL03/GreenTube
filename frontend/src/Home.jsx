import { Link } from 'react-router'
//import dayjs from 'dayjs'
//import relativeTime from 'dayjs/plugin/relativeTime'
//import 'dayjs/locale/fr'
import data from '../data/sample_data.json'

console.log(data)
// dayjs.extend(relativeTime)
// dayjs.locale('fr')

function Home() {
  const videosByRow = Object.values(
    Object.groupBy(data.videos.slice(0, 6), (x, i) => Math.floor(i / 3))
  );
  return (
    <main className="container">
      <div>
        {videosByRow.map((row, rowIndex) => (
          <div key={rowIndex} className="video-row" style={{ display: "flex", gap: "1rem" }}>
            {row.map((video) => (
              <VideoMiniature key={video.id} video={video} />
            ))}
          </div>
        ))}
      </div>
    </main>
  )
}


function VideoMiniature({ video }) {
  return (
    <div className="video-miniature">
      <img src={video.thumbnail} alt={video.title} />
      <h4>{video.title}</h4>
    </div>
  );
}


export default Home