import axios from 'axios';
import { useParams } from 'react-router'
import Header from '../../components/Header';
import App from '../../layouts/App';
import { ToastContainer, toast } from 'react-toastify';
import { useSetRecoilState } from 'recoil';
import { aNumberOfCart } from '../../store';
import { Link } from 'react-router-dom';
import ListOfPlaylists from '../../components/ListOfPlaylists';
import usePlaylist from '../../customHooks/usePlaylist';

export default function Show() {
    const setANumberOfCart = useSetRecoilState(aNumberOfCart);
    const { slug } = useParams();
    const { playlist, lessons, hasBought } = usePlaylist(slug);

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

    return (
        <App title="Show">
            <ToastContainer />
            <Header title={playlist.name}>
                <div>{playlist.description}</div>
                <div className="mt-4">
                    <Link to={`/series/${slug}/1`} className="btn btn-danger me-2"><i className="bi bi-youtube"></i> Watch</Link>
                    {!hasBought &&
                        <button onClick={addToCartHandler} className="btn btn-primary"><i className="bi bi-cart3 me-2"></i>Add to cart</button>
                    }
                </div>
            </Header>
            <div className="container">
                <div className="row">
                    <div className="col-md-8">
                        <div className="card shadow-lg" style={{ marginTop: -70 }}>
                            <div className="card-header bg-white border-bottom py-4">
                                <div className="fs-5 fw-bold px-3 d-flex align-items-center text-capitalize">
                                    <i className="bi bi-collection-play me-4 fs-2"></i> {playlist.name}
                                </div>
                            </div>
                            <ul className="list-group list-group-flush">
                                <ListOfPlaylists lessons={lessons} slug={playlist.slug} />
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </App>
    )
}
