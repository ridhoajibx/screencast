import axios from 'axios';
import React, { useEffect, useState } from 'react'
import App from '../../layouts/App'

export default function Index() {
    const [playlists, setPlaylists] = useState([]);

    useEffect(() => {
        let isMounted = true; // note this flag denote mount status
        const getPlaylists = async () => {
            try {
                let { data } = await axios.get('/api/playlists')
                if(isMounted) setPlaylists(data.data);
            } catch (error) {
                console.log(error);
            }
        }

        getPlaylists()
        return () => (isMounted=false); // use effect cleanup to set flag false
    }, []);

    return (
        <App title="Series">
            <h1>Series</h1>
            <hr />

            <div className="row">
                {playlists &&
                    playlists.map((playlist, index) => (
                        <div className="col-md-4 mb-3" key={index}>
                            <div className="card">
                                <img className="card-img-top" src={playlist.thumbnail} alt={playlist.name} />
                                <div className="card-body">
                                    <a href="javascript.void(0)" className="text-decoration-none">
                                        <h5>{playlist.name}</h5>
                                    </a>
                                    <div className="d-flex align-items-center justify-content-between">
                                        <div className="text-secondary">
                                            {playlist.videos} Episodes
                                        </div>

                                        <div className="text-secondary">
                                            Rp {playlist.price.formatted}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))
                }
            </div>
        </App>
    )
}