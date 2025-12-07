export function ContentButton({ mode, handleModeChange }) {
    return (
        <div>
            <button
                data-ecoid='videos-btn'
                data-greenframeid='videos-btn'
                className={`btn me-1 ${mode === "video" ? "" : "btn-outline"}`}
                onClick={() => handleModeChange("video")}
            >
                Vidéos
            </button>
            <button
                data-ecoid='channels-btn'
                data-greenframeid='channels-btn'
                className={`btn ms-1 ${mode === "user" ? "" : "btn-outline"}`}
                onClick={() => handleModeChange("user")}
            >
                Chaînes
            </button>
        </div>)
}

export default ContentButton