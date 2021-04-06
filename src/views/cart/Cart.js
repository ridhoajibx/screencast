import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useRecoilState } from 'recoil'
import Header from '../../components/Header'
import App from '../../layouts/App'
import { aNumberOfCart } from '../../store'
import { ToastContainer, toast } from 'react-toastify';
import { Link } from 'react-router-dom'

export default function Cart() {
    const [carts, setCarts] = useRecoilState(aNumberOfCart);
    const [total, setTotal] = useState('');

    const removeCartHandler = async (index) => {
        try {
            const { data } = await axios.delete(`/api/remove-cart/${carts[index].id}`)
            setCarts(carts.filter(i => (i !== carts[index])));
            setTotal(total - carts[index].price);
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

    useEffect(() => {
        let price = (carts.map(cart => cart.price))
        setTotal(price.reduce((x, y) => x + y, 0))
    }, [total, carts]);

    return (
        <App title="Carts">
            <ToastContainer />
            <Header title="Carts">
                Your cart
            </Header>

            <div className="container">
                <div className="row">
                    {carts.length > 0 ?
                        <div className="col-md-8 mb-4">
                            <div className="card">
                                <div className="card-header d-flex align-items-center fw-bold">
                                    <span className="badge bg-primary me-2">{carts.length}</span>
                                    <span>Total</span>
                                </div>
                                <div className="card-body">
                                    <table className="table">
                                        <thead>
                                            <tr>
                                                <th scope="col">#</th>
                                                <th scope="col">Playlist</th>
                                                <th scope="col" className="text-end">Price</th>
                                                <th scope="col" className="text-end">Action</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {carts.map((cart, index) => (
                                                <tr key={index}>
                                                    <th scope="row">{index + 1}</th>
                                                    <td>{cart.playlist.name}</td>
                                                    <td className="text-end">Rp {cart.price}</td>
                                                    <td className="text-end">
                                                        <button onClick={() => { removeCartHandler(index) }} className="btn btn-danger btn-sm">Remove</button>
                                                    </td>
                                                </tr>
                                            ))
                                            }
                                            <tr>
                                                <td colSpan="2"></td>
                                                <th className="text-end" scope="row">Rp {total}</th>
                                                <td className="text-end">
                                                    <button className="btn btn-primary btn-sm">Checkout</button>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div> :
                        <div className="alert alert-warning" role="alert">
                            Your cart is empty. please buy atleast one, go to the <Link className="btn btn-sm btn-primary" to="/series"><i className="bi bi-collection-play me-2"></i>Series</Link>
                      </div>
                    }
                </div>
            </div>
        </App >
    )
}