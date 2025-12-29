import { useState } from 'react';

import { backApi } from '../api/backApi';
import { API } from '../constants/constants';

const PodcastPlayer = ({ idVideo, path, poster }) => {
    const [hasCountedView, setHasCountedView] = useState(false);

    const incrementView = async () => {
        if (hasCountedView) return;
        setHasCountedView(true);

        const data = await backApi.incrementView(idVideo)
        if (!data.success) {
            console.log(data.message);
        }
    };

    return (
        <div className="w-full max-w-600 bg-dark-gray rounded-sm p-4 text-center">
            <div className="mb-2">
                <img
                    src={`${API.URL}/${poster}`}
                    className='w-300 h-200 border rounded-sm fit-cover'
                />
            </div>

            <div className="mb-3 text-white">
                <p>Lecture en mode audio</p>
            </div>

            <audio
                controls
                src={`${API.URL}/${path}`}
                className="w-full h-56"
                onPlay={incrementView}
            >
                Votre navigateur ne supporte pas l'élément audio.
            </audio>
        </div>
    );
};

export default PodcastPlayer;