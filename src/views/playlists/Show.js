import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router'
import Header from '../../components/Header';
import App from '../../layouts/App';
import { ToastContainer, toast } from 'react-toastify';
import { useSetRecoilState } from 'recoil';
import { aNumberOfCart } from '../../store';

export default function Show() {
    const setANumberOfCart = useSetRecoilState(aNumberOfCart);
    const { slug } = useParams();
    const [playlist, setPlaylist] = useState([]);
    const [lessons, setLessons] = useState([]);
    const [loading, setLoading] = useState(false);

    const addToCartHandler = async () => {
        try {
            let { data } = await axios.post(`/api/add-to-cart/${playlist.slug}`)
            toast(`🚀 ${data.message}`, {
                position: "top-right",
                autoClose: 3000,
            });
            setANumberOfCart(cart => [...cart, data.data]);
        } catch ({ response }) {
            toast(`🚀 ${response.data.message}`, {
                position: "top-right",
                autoClose: 3000,
            });
        }
    }

    useEffect(() => {
        let isMounted = true;
        const getApiData = async (url, set) => {
            setLoading(true)
            try {
                let { data } = await axios.get(url)
                if (isMounted) {
                    set(data.data)
                    setLoading(false)
                };
            } catch ({ response }) {
                console.log(response.statusText);
                setLoading(false)
            }
        }
        getApiData(`/api/playlists/${slug}`, setPlaylist);
        getApiData(`/api/playlists/${slug}/videos`, setLessons);
        return () => { isMounted = false }
    }, [slug]);

    const spinner = <div className="d-flex align-items-center">
        <strong>Loading...</strong>
        <div className="spinner-border ms-auto" role="status" aria-hidden="true"></div>
    </div>;

    return (
        <App title="Show">
            <ToastContainer />
            <Header title={playlist.name}>
                <div>{playlist.description}</div>
                <div className="mt-4">
                    <button className="btn btn-danger me-2"><i className="bi bi-youtube"></i> Watch trailer</button>
                    <button onClick={addToCartHandler} className="btn btn-primary"><i className="bi bi-cart3 me-2"></i>Add to cart</button>
                </div>
            </Header>
            <div className="container">
                <div className="row">
                    { loading && spinner }
                    {lessons.length > 0 && !loading &&
                        <div className="col-md-8">
                            <div className="card shadow-lg" style={{ marginTop: -70 }}>
                                <div className="card-header bg-white border-bottom py-4">
                                    <div className="fs-5 fw-bold px-3 d-flex align-items-center text-capitalize">
                                        <i className="bi bi-collection-play me-4 fs-2"></i> {playlist.name}
                                    </div>
                                </div>
                                <ul className="list-group list-group-flush">
                                    {lessons.map((lesson, index) => (
                                        <li key={index} className="list-group-item">
                                            <a href="#" className="text-decoration-none text-dark d-flex align-items-center px-3">
                                                <i className="bi bi-play-circle-fill fs-2"></i>
                                                <div className="ms-4">
                                                    {lesson.title}
                                                    <div style={{ fontSize: "13px" }} className="fw-medium text-secondary">Episode {lesson.episode}</div>
                                                </div>
                                            </a>
                                        </li>
                                    ))
                                    }
                                </ul>
                            </div>
                        </div>
                    }
                </div>
            </div>
        </App>
    )
}
