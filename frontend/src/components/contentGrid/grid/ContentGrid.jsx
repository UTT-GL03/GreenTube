import { useState } from "react"

import { filterAndSort } from "../../../utils/filterAndSortContent"

import SortButtons from "../../SortButtons"
import ContentButton from "../button/ContentButton"
import SeeMoreButton from "../../SeeMoreButton"
import VideoGrid from "../../video/grid/VideoGrid"
import ChannelGrid from "../../channel/grid/ChannelGrid"

function ContentGrid({videos, channels, query, showModeSwitch = true }) {
    const [mode, setMode] = useState("video")
    const [sortKey, setSortKey] = useState("title")
    const [visibleCount, setVisibleCount] = useState(6) 

    const normalizedQuery = query?.trim().toLowerCase() || ""

    // Prepare data items
    const sortedItems = filterAndSort(mode === "video" ? videos : channels, normalizedQuery, mode, sortKey)
    const visibleItems = Object.values(
        Object.groupBy(sortedItems.slice(0, visibleCount), (_, i) => Math.floor(i / 3))
    )
    const totalItems = sortedItems.length

    // Handle fonction
    const handleSeeMore = () => setVisibleCount((p) => p + 6)

    const handleModeChange = (newMode) => {
        setMode(newMode)
        setVisibleCount(6)
        setSortKey(newMode === "video" ? "title" : "name")
    }

    return (
        <div>
      {totalItems !== 0 ? (
        <>
          <div className="flex justify-between items-center min-w-900 mt-3">
            <SortButtons sortKey={sortKey} setSortKey={setSortKey} type={mode} />
            <ContentButton showModeSwitch={showModeSwitch} mode={mode} handleModeChange={handleModeChange} />
          </div>

          <div className="my-2">
            {mode === "video" ? (
              <VideoGrid videos={visibleItems} />
            ) : (
              <ChannelGrid channels={visibleItems} />
            )}

            <SeeMoreButton visibleCount={visibleCount} totalItems={totalItems} onSeeMore={handleSeeMore} />
          </div>
        </>
      ) : (
        <>
          <div className="flex justify-between items-center mt-4">
            <ContentButton showModeSwitch={showModeSwitch} mode={mode} handleModeChange={handleModeChange} />
          </div>
          <h4 className="text-center mt-3">
            {query ? `Aucun résultat pour "${query}"` : "Aucun résultat"}
          </h4>
        </>
      )}
    </div>
    )
}

export default ContentGrid
