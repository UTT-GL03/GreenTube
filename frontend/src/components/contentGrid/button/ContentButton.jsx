export function ContentButton({ showModeSwitch, mode, handleModeChange }) {
    if (showModeSwitch) {
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
                    className={`btn ms-1 ${mode === "channel" ? "" : "btn-outline"}`}
                    onClick={() => handleModeChange("channel")}
                >
                    Chaînes
                </button>
            </div>)
    }
}

export default ContentButton