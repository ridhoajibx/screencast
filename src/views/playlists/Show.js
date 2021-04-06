import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router'
import Header from '../../components/Header';
import App from '../../layouts/App'

export default function Show() {
    const { slug } = useParams();
    const [playlist, setPlaylist] = useState([]);
    const [lessons, setLessons] = useState([]);

    useEffect(() => {
        let isMounted = true;
        const getApiData = async (url, set) => {
            try {
                let { data } = await axios.get(url)
                if (isMounted) set(data.data);
            } catch ({ response }) {
                console.log(response.statusText);
            }
        }
        getApiData(`/api/playlists/${slug}`, setPlaylist);
        getApiData(`/api/playlists/${slug}/videos`, setLessons);
        return () => { isMounted = false }
    }, [slug]);

    return (
        <App title="Show">
            <Header title={playlist.name}>
                <div>{playlist.description}</div>
                <div className="mt-4">
                    <button className="btn btn-secondary me-2">Watch trailer</button>
                    <button className="btn btn-primary">Add to cart</button>
                </div>
            </Header>
            <div className="container">
                <div className="row">
                    <div className="col-md-8">
                        <div className="card" style={{ marginTop: -80 }}>
                            <div className="card-header bg-white border-bottom py-3">
                                {playlist.name}
                            </div>
                            <div className="card-body">
                                <ol className="m-0 ps-3">
                                    {lessons.map((lesson, index) => (
                                        <li key={index} className="my-2">
                                            <a href="#" className="text-decoration-none text-dark">
                                                {lesson.title}
                                            </a>
                                        </li>
                                    ))
                                    }
                                </ol>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </App>
    )
}
