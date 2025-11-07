function SortButtons() {
    return (
        <div>
            <button className="btn mx-1" onClick={() => setSortKey('default')}>Par défaut</button>
            <button className="btn mx-1" onClick={() => setSortKey('title')}>Par titre</button>
            <button className="btn mx-1" onClick={() => setSortKey('date')}>Par date</button>
        </div>
    )
}

export default SortButtons