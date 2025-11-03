import { useState } from 'react'
import data from '/data/sample_data.json'
import VideoMiniature from '../video/minia/VideoMiniature'
import { useParams } from 'react-router'

function Home() {
  //const { query } = useParams()
  const [visibleCount, setVisibleCount] = useState(6)

  // Systeme de trie à implémenter 

  const visibleVideos = data.videos.slice(0, visibleCount)
  const videosByRow = Object.values(Object.groupBy(visibleVideos, (_, i) => Math.floor(i / 3)))

  return (
    <main className="center">
      <div className="home-container">

        <div className="spacer-3"/>

        <div className="sort-buttons">
          <button className="btn mx-1" onClick={() => setSortKey('default')}>Par défaut</button>
          <button className="btn mx-1" onClick={() => setSortKey('title')}>Par titre</button>
          <button className="btn mx-1" onClick={() => setSortKey('date')}>Par date</button>
        </div>

        <div className="spacer-2"/>
        <div className="grid">
          {videosByRow.map((row, rowIndex) => (
            <div key={rowIndex} className="row">
              {row.map((video) => (
                <VideoMiniature key={video.id} video={video} />
              ))}
            </div>
          ))}
        </div>

        <div className="spacer-2"/>

        <div className='center'>
          {visibleCount < data.videos.length && (
            <button className="btn" onClick={() => setVisibleCount((p) => p + 6)}>
              Voir plus
            </button>
          )}
        </div>

        <div className="spacer-2"/>
      </div>
    </main>
  )
}

export default Home