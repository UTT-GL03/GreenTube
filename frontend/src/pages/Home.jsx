import { useSearch } from '../contexts/SearchContext'
import { useEffect, useState } from 'react'

import { backApi } from '../api/backApi'

import SortButtons from '../components/SortButtons'
import ContentButton from '../components/contentGrid/button/ContentButton'
import VideoGrid from '../components/video/grid/VideoGrid'
import ChannelGrid from '../components/channel/grid/ChannelGrid'
import SeeMoreButton from '../components/SeeMoreButton'

const MODE_STORAGE_KEY = 'homeFeedMode';

function Home() {
  // HOOKs
  const { query } = useSearch()

  const [mode, setMode] = useState(() => {
    const savedMode = localStorage.getItem(MODE_STORAGE_KEY);
    return savedMode || "video";
  })
  const [sortKey, setSortKey] = useState("date")
  const [order, setOrder] = useState("asc")
  const [hasMore, setHasMore] = useState(true);
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    loadAll(true)
  }, [query, mode, sortKey, order])

  // FUNCTIONs
  const loadAll = async (reset = false) => {
    setLoading(true)
    const offset = reset ? 0 : items.length
    const limit = 6

    const params = {
      type: mode,
      query,
      limit,
      offset,
      sortKey,
      order
    };

    try {
      const videos = await backApi.getHome(params)

      setItems(prev => (reset ? videos : [...prev, ...videos]))
      setHasMore(videos.length === limit)
    } catch (err) {
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  const handleSeeMore = () => {
    loadAll(false)
  }

  const handleModeChange = (newMode) => {
    if (mode === newMode) return;
    localStorage.setItem(MODE_STORAGE_KEY, newMode);
    setMode(newMode)
    setSortKey(newMode === "video" ? "date" : "name")
    setItems([]);
    setHasMore(true);
  }

  // VARs
  const visibleItems = Object.values(
    Object.groupBy(items, (_, i) => Math.floor(i / 3))
  )
  const isSortButtonsVisible = items.length !== 0;
  const justifyContentClass = isSortButtonsVisible
    ? "justify-between"
    : "justify-center";

  //
  return (
    <main className="center">
      <div>
        <div>
          <div className={`flex ${justifyContentClass} items-center w-1000 mt-3 mx-auto`}>
            {isSortButtonsVisible && (
              <SortButtons sortKey={sortKey} setSortKey={setSortKey} type={mode} order={order} setOrder={setOrder} />
            )}
            <ContentButton mode={mode} handleModeChange={handleModeChange} />
          </div>

          <div className="my-2">
            {mode === "video" ? (
              <VideoGrid videos={visibleItems} />
            ) : (
              <ChannelGrid channels={visibleItems} />
            )}

            {hasMore && items.length !== 0 && (
              !loading ? (
                <SeeMoreButton onSeeMore={handleSeeMore} />
              ) : (
                <div className="center">
                  <div className="btn mt-2">Chargement...</div>
                </div>
              )
            )}

            {!loading && items.length === 0 && (
              <h4 className="text-center mt-3">
                {query ? `Aucun résultat pour "${query}"` : "Aucun résultat"}
              </h4>
            )}
          </div>
        </div>
      </div>
    </main >
  )
}

export default Home