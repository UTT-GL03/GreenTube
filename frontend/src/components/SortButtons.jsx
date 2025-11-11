function SortButtons({ setSortKey, type }) {
    return (
        <div>
            {type === "video" ? (
                <>
                    <button className="btn mx-1" onClick={() => setSortKey("title")}>
                        Par titre
                    </button>
                    <button className="btn mx-1" onClick={() => setSortKey("date")}>
                        Par date
                    </button>
                </>
            ) : (
                <>
                    <button className="btn mx-1" onClick={() => setSortKey("name")}>
                        Par nom
                    </button>
                    <button className="btn mx-1" onClick={() => setSortKey("subscribers")}>
                        Par abonnés
                    </button>
                    <button className="btn mx-1" onClick={() => setSortKey("date")}>
                        Par date de création
                    </button>
                </>
            )}
        </div>
    )
}

export default SortButtons