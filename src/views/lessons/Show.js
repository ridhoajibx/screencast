import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import App from '../../layouts/App';
import YouTube from 'react-youtube';
import axios from 'axios';
import ListOfPlaylists from '../../components/ListOfPlaylists';
import usePlaylist from '../../customHooks/usePlaylist';

const Show = () => {
    const { slug, episode } = useParams();
    const [lesson, setLesson] = useState([]);
    const [errorScreen, setErrorScreen] = useState(false);
    const { playlist, lessons, hasBought } = usePlaylist(slug)

    useEffect(() => {
        const getLesson = async () => {
            try {
                const lessonResponse = await axios.get(`api/playlists/${slug}/${episode}`)
                setLesson(lessonResponse.data.data)
            } catch (e) {
                setErrorScreen(true);
            }
        }
        getLesson();
    }, [slug, episode])
    const onReady = () => {
        console.log('Ready to play');
    }

    return (
        <App title={lesson.title}>
            <div className="bg-dark mb-5">
                {hasBought && !errorScreen &&
                    <div className="container">
                        <YouTube
                            videoId={lesson.unique_video_id}
                            className={''}
                            containerClassName={'ratio ratio-21x9'}
                            onReady={onReady}
                        />
                    </div>
                }
                {!hasBought && lesson.intro &&
                    !errorScreen && (
                        <div className="container">
                            <YouTube
                                videoId={lesson.unique_video_id}
                                className={''}
                                containerClassName={'ratio ratio-21x9'}
                                onReady={onReady}
                            />
                        </div>
                    )
                }

                {errorScreen &&
                    <div className="container">
                        <div className="text-white py-5">
                            Can not watch this video, You must but the series!
                        </div>
                    </div>
                }
            </div>
            <div className="container">
                <div className="row">
                    <div className="col-md-6">
                        <ListOfPlaylists lessons={lessons} slug={playlist.slug} />
                    </div>
                </div>
            </div>
        </App>
    );
}

export default Show;

