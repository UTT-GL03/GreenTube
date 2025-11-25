function SortButtons({ sortKey, setSortKey, type }) {
    return (
        <div>
            {type === "video" ? (
                <>
                    <button
                        data-greenframeid="title-btn"
                        className={`btn me-1 ${sortKey === "title" ? "" : "btn-outline"}`}
                        onClick={() => setSortKey("title")}>
                        Par titre
                    </button>
                    <button
                        data-greenframeid="date-btn"
                        className={`btn ms-1 ${sortKey === "date" ? "" : "btn-outline"}`}
                        onClick={() => setSortKey("date")}>
                        Par date
                    </button>
                </>
            ) : (
                <>
                    <button className={`btn me-1 ${sortKey === "name" ? "" : "btn-outline"}`} onClick={() => setSortKey("name")}>
                        Par nom
                    </button>
                    <button className={`btn mx-1 ${sortKey === "subscribers" ? "" : "btn-outline"}`} onClick={() => setSortKey("subscribers")}>
                        Par abonnés
                    </button>
                    <button className={`btn ms-1 ${sortKey === "date" ? "" : "btn-outline"}`} onClick={() => setSortKey("date")}>
                        Par date de création
                    </button>
                </>
            )}
        </div>
    )
}

export default SortButtons