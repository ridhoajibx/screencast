import axios from 'axios'
import React from 'react'
import { useRecoilState } from 'recoil'
import Header from '../../components/Header'
import App from '../../layouts/App'
import { aNumberOfCart } from '../../store'
import { ToastContainer, toast } from 'react-toastify';
import { Link } from 'react-router-dom'

export default function Cart() {
    const [carts, setCarts] = useRecoilState(aNumberOfCart);

    const removeCartHandler = async (index) => {
        try {
            const { data } = await axios.delete(`/api/remove-cart/${carts[index].id}`)
            setCarts(carts.filter(i => (i !== carts[index])));
            toast(`🚀 ${data.message}`, {
                position: "top-right",
                autoClose: 3000,
            });
        } catch ({ data }) {
            toast(`🚀 ${data.message}`, {
                position: "top-right",
                autoClose: 3000,
            });
        }
    }

    return (
        <App title="Cart">
            <ToastContainer />
            <Header title="Cart">
                Your cart
            </Header>

            <div className="container">
                <div className="row">
                    <div className="col-md-8" style={{ marginTop: -70 }}>
                        <div className="card">
                            <div className="card-header">
                                Your cart
                            </div>
                            <div className="card-body">
                                <table className="table">
                                    <thead>
                                        <tr>
                                            <th scope="col">#</th>
                                            <th scope="col">Playlist</th>
                                            <th scope="col">Price</th>
                                            <th scope="col">Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        { carts.length > 0 ?
                                            carts.map((cart, index) => (
                                                <tr key={index}>
                                                    <th scope="row">{index + 1}</th>
                                                    <td>{cart.playlist.name}</td>
                                                    <td>Rp {cart.price}</td>
                                                    <td>
                                                        <button onClick={() => { removeCartHandler(index) }} className="btn btn-danger btn-sm">Remove</button>
                                                    </td>
                                                </tr>
                                            )) :

                                            <tr>
                                                <th scope="row">1</th>
                                                <th scope="row">You haven't got any playlist yet!</th>
                                                <td>Rp 0</td>
                                                <td>
                                                    <Link to="/series" className="btn btn-primary btn-sm">Check Series</Link>
                                                </td>
                                            </tr>
                                        }
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </App >
    )
}