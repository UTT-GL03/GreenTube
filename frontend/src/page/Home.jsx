import { useData } from '../context/DataContext'
import { useSearch } from '../context/SearchContext'

import ContentGrid from '../components/contentGrid/grid/ContentGrid'

function Home() {
  const { videos, users } = useData()
  const { query } = useSearch()

  return (
    <main className="center">
      <div>
        <ContentGrid videos={videos} channels={users} query={query} />
      </div>
    </main>
  )
}

export default Home