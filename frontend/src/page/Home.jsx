import { useContext } from 'react'

import { DataContext } from '../context/DataContext'
import { SearchContext } from '../context/SearchContext'

import ContentGrid from '../components/contentGrid/grid/ContentGrid'

function Home() {
  const { videos, users } = useContext(DataContext)
  const { query } = useContext(SearchContext)

  return (
    <main className="center">
      <div>
        <ContentGrid videos={videos} channels={users} query={query} />
      </div>
    </main>
  )
}

export default Home