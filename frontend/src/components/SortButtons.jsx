export function SortButtons({ sortKey, setSortKey, type, order, setOrder }) {
    const orderIcon = order === "asc" ? (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="white" className="me-1">
            <path d="M12 4l-6 6h12z" />
        </svg>
    ) : (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="white" className="me-1">
            <path d="M12 20l6-6H6z" />
        </svg>
    );

    const handleClick = (key) => {
        if (sortKey === key) {
            setOrder(order === "asc" ? "desc" : "asc");
        } else {
            setSortKey(key);
            setOrder("asc");
        }
        setSortKey(key);
    };

    const renderSortButton = (key, label) => (
        <button
            className={`btn ${sortKey === key ? "" : "btn-outline"} me-1`}
            onClick={() => handleClick(key)}
        >
            {sortKey === key && orderIcon}
            <span className="ms-1">{label}</span>
        </button>
    );

    return (
        <div>
            {type === "video" ? (
                <>
                    {renderSortButton("date", "Par date")}
                    {renderSortButton("name", "Par titre")}
                    {renderSortButton("views", "Par vues")}
                </>
            ) : (
                <>
                    {renderSortButton("name", "Par nom")}
                    {renderSortButton("subscribers", "Par abonnés")}
                    {renderSortButton("date", "Par date de création")}
                </>
            )}
        </div>
    );
}

export default SortButtons;