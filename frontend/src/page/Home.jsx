import ContentGrid from '../components/ContentGrid'

const response = await fetch('/data/sample_data_high.json');
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