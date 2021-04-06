import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import Header from '../../components/Header';
import App from '../../layouts/App'

export default function Index() {
    const [playlists, setPlaylists] = useState([]);
    const [links, setLinks] = useState([]);
    const [url, setUrl] = useState('/api/playlists');
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        let isMounted = true; // note this flag denote mount status
        const getPlaylists = async () => {
            setLoading(true)
            try {
                let { data } = await axios.get(url)
                if (isMounted) {
                    setPlaylists(data.data)
                    setLinks(data.meta.links)
                    setLoading(false)
                };
            } catch (error) {
                console.log(error);
                setLoading(false)
            }
        }

        getPlaylists()
        return () => (isMounted = false); // use effect cleanup to set flag false
    }, [url]);

    const spinner = <div className="d-flex align-items-center">
        <strong>Loading...</strong>
        <div className="spinner-border ms-auto" role="status" aria-hidden="true"></div>
    </div>;
    return (
        <App title="Series">
            <Header title="All Series">
                The latest <strong>Series</strong> we have
            </Header>

            <div className="container">
                <div className="row">
                    {loading && spinner}
                    {playlists &&
                        playlists.map((playlist, index) => (
                            <div className="col-md-4 mb-3" key={index}>
                                <div className="card">
                                    <img className="card-img-top" src={playlist.thumbnail} alt={playlist.name} />
                                    <div className="card-body">
                                        <Link to={`/series/${playlist.slug}`} className="text-decoration-none">
                                            <h5>{playlist.name}</h5>
                                        </Link>
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

                    <nav aria-label="Page navigation">
                        <ul className="pagination">
                            {links.length > 0 &&
                                links.map((link, id) => (
                                    <li key={id} className={`page-item ${link.active && 'active'}`}><button onClick={(e) => setUrl(link.url)} className="page-link" dangerouslySetInnerHTML={{ __html: link.label }} /></li>
                                ))
                            }
                        </ul>
                    </nav>
                </div>
            </div>
        </App>
    )
}