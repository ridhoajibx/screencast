import axios from 'axios';
import { useState, useEffect } from 'react';

const usePlaylist = (identifier) => {
    const [playlist, setPlaylist] = useState([]);
    const [lessons, setLessons] = useState([]);
    const [hasBought, setHasBought] = useState(false);

    useEffect(() => {
        const getPlaylist = async () => {
            const { data } = await axios.get(`/api/playlists/${identifier}/videos`);
            setPlaylist(data.playlist);
            setLessons(data.data);
        }

        const checkIfUserHasBought = async () => {
            const { data } = await axios.get(`/api/check-if-user-hasbought-${identifier}`);
            setHasBought(data.data);
        }

        getPlaylist();
        checkIfUserHasBought();
    }, [identifier]);

    return { playlist, lessons, hasBought }
}

export default usePlaylist;
