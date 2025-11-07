import { useState } from 'react'
import data from '/data/sample_data.json'
import VideoMiniature from '../video/minia/VideoMiniature'
import SortButtons from '../SortButtons'
import { useParams } from 'react-router'
import VideoGrid from '../VideoGrid'

function Home() {
  //const { query } = useParams()
  
  const [visibleCount, setVisibleCount] = useState(6)

  const visibleVideos = data.videos.slice(0, visibleCount)
  const videosByRow = Object.values(
    Object.groupBy(visibleVideos, (_, i) => Math.floor(i / 3))
  )
  // Systeme de trie à implémenter 

  return (
    <main className="center">
      <div>

        <div className="spacer-4"/>

        <VideoGrid
          videosByRow={videosByRow}
          visibleCount={visibleCount}
          setVisibleCount={setVisibleCount}
          totalVideos={data.videos.length}
        />

      </div>
    </main>
  )
}

export default Home