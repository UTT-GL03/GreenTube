import { useState } from "react"
import SortButtons from "./SortButtons"
import VideoGrid from "./video/grid/VideoGrid"
import ChannelGrid from "./channel/grid/ChannelGrid"

function ContentGrid({ videos, channels, query, showModeSwitch = true }) {

    const [mode, setMode] = useState("video")
    const [sortKey, setSortKey] = useState("title")
    const [visibleCount, setVisibleCount] = useState(6)

    const normalizedQuery = query?.trim().toLowerCase() || ""

    const sortedItems = filterAndSort(mode === "video" ? videos : channels, normalizedQuery, mode, sortKey)
    const visibleItems = Object.values(
        Object.groupBy(sortedItems.slice(0, visibleCount), (_, i) => Math.floor(i / 3))
    )
    const totalItems = sortedItems.length

    const handleModeChange = (newMode) => {
        setMode(newMode)
        setVisibleCount(6)
        setSortKey(newMode === "video" ? "title" : "name")
    }

    return (
        <div>
            {
                totalItems !== 0 ? (
                    <>
                        <div className="flex justify-between items-center my-3">
                            <SortButtons setSortKey={setSortKey} type={mode} />

                            {showModeSwitch && (
                                <div>
                                    <button
                                        data-ecoid='videos-btn'
                                        className={`btn mx-1 ${mode === "video" ? "" : ""}`}
                                        onClick={() => handleModeChange("video")}
                                    >
                                        Vidéos
                                    </button>
                                    <button 
                                        data-ecoid='channels-btn'
                                        className={`btn mx-1 ${mode === "channel" ? "" : ""}`}
                                        onClick={() => handleModeChange("channel")}
                                    >
                                        Chaînes
                                    </button>
                                </div>
                            )}
                        </div>

                        <div className="my-3">
                            {mode === "video" ? (
                                <VideoGrid
                                    videos={visibleItems}
                                />
                            ) : (
                                <ChannelGrid
                                    channels={visibleItems}
                                />
                            )}

                            <div className='center'>
                                {visibleCount < totalItems && (
                                    <button className="btn" onClick={() => setVisibleCount((p) => p + 6)}>
                                        Voir plus
                                    </button>
                                )}
                            </div>

                            <div className="spacer-2" />
                        </div>
                    </>

                ) : totalItems === 0 && (
                    <>
                        <div className="flex justify-between items-center my-3">
                            <div>
                                <button
                                    className={`btn mx-1 ${mode === "video" ? "" : ""}`}
                                    onClick={() => handleModeChange("video")}
                                >
                                    Vidéos
                                </button>
                                <button
                                    className={`btn mx-1 ${mode === "channel" ? "" : ""}`}
                                    onClick={() => handleModeChange("channel")}
                                >
                                    Chaînes
                                </button>
                            </div>
                        </div>
                        <h4 className="text-center my-4">
                            {query ? `Aucun résultat pour "${query}"` : "Aucun résultat"}
                        </h4>
                    </>
                )
            }

        </div >
    )
}

function filterAndSort(items, query, mode, sortKey) {
    let filtered = items

    if (query && query !== "") {
        filtered = filtered.filter(item => {
            if (mode === "video") return item.title.toLowerCase().includes(query) || item.desc.toLowerCase().includes(query)
            if (mode === "channel") return item.pseudo.toLowerCase().includes(query) || item.desc.toLowerCase().includes(query)
            return false
        })
    }

    const sorted = [...filtered]
    switch (mode) {
        case "video":
            if (sortKey === "title") sorted.sort((a, b) => a.title.localeCompare(b.title))
            if (sortKey === "date") sorted.sort((a, b) => new Date(b.date) - new Date(a.date))
            break
        case "channel":
            if (sortKey === "name") sorted.sort((a, b) => a.pseudo.localeCompare(b.pseudo))
            if (sortKey === "subscribers") sorted.sort((a, b) => b.subscribers - a.subscribers)
            if (sortKey === "date") sorted.sort((a, b) => new Date(b.creation_date) - new Date(a.creation_date))
            break
        default:
            break
    }

    return sorted
}

export default ContentGrid
