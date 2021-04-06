import axios from 'axios';
import React from 'react'
import { useHistory } from 'react-router';
import { NavLink } from 'react-router-dom';
import { useRecoilState, useRecoilValue } from 'recoil';
import { aNumberOfCart, authenticatedUser } from '../store';

export default function Navigation() {
    const history = useHistory()
    const [auth, setAuth] = useRecoilState(authenticatedUser);
    const carts = useRecoilValue(aNumberOfCart);

    const logoutHandler = async (e) => {
        e.preventDefault();
        try {
            await axios.post(`/logout`);
            setAuth({ user: [], check: false });
            history.push('/login');
        } catch (e) {
            console.log(e.response)
        }
    }
    return (
        <nav className="navbar fixed-top navbar-expand-lg navbar-light bg-white border-bottom border-1">
            <div className="container py-2">
                <NavLink exact to="/" className="navbar-brand">Screencast</NavLink>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon" />
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                            <NavLink exact to="/" className="nav-link">Home</NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink to="/series" className="nav-link">Series</NavLink>
                        </li>

                        {auth.check &&
                            <li className="nav-item">
                                <NavLink to="/dashboard" className="nav-link">Dashboard</NavLink>
                            </li>
                        }
                    </ul>

                    {auth.check ?
                        <ul className="navbar-nav mb-2 mb-lg-0">
                            <li className="nav-item">
                                <a href="#" className="nav-link d-flex align-items-center">
                                    <i className="bi bi-cart3 me-1" />
                                    <span className="badge bg-secondary rounded-pill"> {carts.length} </span>
                                </a>
                            </li>
                            <li className="nav-item dropdown">
                                <div className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                    {auth.user.name}
                                </div>
                                <ul className="dropdown-menu dropdown-menu-end" aria-labelledby="navbarDropdown">
                                    <li><span className="dropdown-item">Account</span></li>
                                    {/* <li><hr className="dropdown-divider" /></li> */}
                                    <li><button onClick={logoutHandler} className="dropdown-item">Logout</button></li>
                                </ul>
                            </li>
                        </ul> :

                        <ul className="navbar-nav mb-2 mb-lg-0">
                            <li className="nav-item">
                                <NavLink to="/login" className="nav-link">Login</NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink to="/register" className="nav-link">Register</NavLink>
                            </li>
                        </ul>
                    }
                </div>
            </div>
        </nav>
    )
}
