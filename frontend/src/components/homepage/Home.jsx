import { useState } from 'react'
import data from '/data/sample_data.json'
import VideoMiniature from '../video/minia/VideoMiniature'
import './Home.css'
import { useParams } from 'react-router'

function Home() {
  //const { query } = useParams()
  const [visibleCount, setVisibleCount] = useState(6)

  // Systeme de trie à implémenter 

  const visibleVideos = data.videos.slice(0, visibleCount)
  const videosByRow = Object.values(Object.groupBy(visibleVideos, (_, i) => Math.floor(i / 3)))

  return (
    <main className="home-container">
      <div className="sort-buttons">
        <button className="btn" onClick={() => setSortKey('default')}>Par défaut</button>
        <button className="btn" onClick={() => setSortKey('title')}>Par titre</button>
        <button className="btn" onClick={() => setSortKey('date')}>Par date</button>
      </div>

      <div className="videos-grid">
        {videosByRow.map((row, rowIndex) => (
          <div key={rowIndex} className="video-row">
            {row.map((video) => (
              <VideoMiniature key={video.id} video={video} />
            ))}
          </div>
        ))}
      </div>

      <div className='center'>
        {visibleCount < data.videos.length && (
          <button className="" onClick={() => setVisibleCount((p) => p + 6)}>
            Voir plus
          </button>
        )}
      </div>

    </main>
  )
}

export default Home