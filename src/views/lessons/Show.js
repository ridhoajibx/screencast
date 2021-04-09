import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import App from '../../layouts/App';
import YouTube from 'react-youtube';
import axios from 'axios';
import ListOfPlaylists from '../../components/ListOfPlaylists';

const Show = () => {
    const [lesson, setLesson] = useState([]);
    const [playlist, setPlaylist] = useState([]);

    const { slug, episode } = useParams();

    useEffect(() => {
        const getLesson = async () => {
            const { data } = await axios.get(`api/playlists/${slug}/${episode}`)
            setLesson(data.data)
            setPlaylist(data.playlist);
        }
        getLesson();
    }, [slug, episode])

    const onReady = () => {
        console.log('Ready to play');
    }

    return (
        <App title={`series-${slug}-episode ${episode}`}>
            <div className="bg-dark mb-5">
                <div className="container">
                    <YouTube
                        videoId={lesson.unique_video_id}
                        className={''}
                        containerClassName={'ratio ratio-21x9'}
                        onReady={onReady}
                    />
                </div>
            </div>
            <div className="container">
                <div className="row">
                    <div className="col-md-6">
                        <ListOfPlaylists slug={playlist.slug} />
                    </div>
                </div>
            </div>
        </App>
    );
}

export default Show;

