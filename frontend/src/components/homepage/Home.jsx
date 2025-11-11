import data from '/data/sample_data.json'
import ContentGrid from '../ContentGrid'

function Home({query}) {

  return (
    <main className="center">
      <div>

        <ContentGrid
          videos={data.videos}
          channels={data.users}
          query={query}
        />

      </div>
    </main>
  )
}

export default Home