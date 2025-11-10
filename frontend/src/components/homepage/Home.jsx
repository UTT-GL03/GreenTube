import data from '/data/sample_data.json'
import { useState } from 'react'
import { useParams } from 'react-router'
import VideoGrid from '../VideoGrid'

function Home() {
  const { query } = useParams()
  
  const [visibleCount, setVisibleCount] = useState(6)

  let filteredVideos = data.videos
  if(query){
    filteredVideos = filteredVideos.filter(v => v.title.includes(query))
  }


  return (
    <main className="center">
      <div>

        <div className="spacer-4"/>

        <VideoGrid
          videos={filteredVideos}
          visibleCount={visibleCount}
          setVisibleCount={setVisibleCount}
          totalVideos={filteredVideos.length}
        />

      </div>
    </main>
  )
}

export default Home