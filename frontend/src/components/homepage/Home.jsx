import ContentGrid from '../ContentGrid'

const response = await fetch('/data/sample_data.json');
const data = await response.json();

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