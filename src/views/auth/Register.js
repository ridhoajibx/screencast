import axios from 'axios';
import React, { useState } from 'react';
import { useHistory } from 'react-router';
import { useSetRecoilState } from 'recoil';
import App from '../../layouts/App';
import { authenticatedUser } from '../../store';

const Register = (props) => {
    let history = useHistory()
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('')
    const [password_confirmation, setPasswordConfirmation] = useState('')

    const setAuth = useSetRecoilState(authenticatedUser);
    let credentials = { name, email, password, password_confirmation }

    const submitHandler = async(e) => {
        e.preventDefault();
        let {data} = await axios.post('/register', credentials)
        setAuth({
            user: data.user,
            check:true
        })
        history.push('/dashboard')
    }
    return (
        <App title="Register">
            <div className="row">
                <div className="col-md-6 offset-md-3">
                    <div className="card">
                        <div className="card-header text-uppercase">Register</div>
                        <div className="card-body">
                            <form onSubmit={submitHandler}>
                                <div className="mb-3">
                                    <label className="form-label" htmlFor="name">Name</label>
                                    <input value={name} onChange={(e) => setName(e.target.value)} type="text" name="name" id="name" className="form-control" />
                                </div>

                                <div className="mb-3">
                                    <label className="form-label" htmlFor="email">Email</label>
                                    <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" name="email" id="email" className="form-control" />
                                </div>

                                <div className="mb-3">
                                    <label className="form-label" htmlFor="password">Password</label>
                                    <input value={password} onChange={(e) => setPassword(e.target.value)} type="password" name="password" id="password" className="form-control" />
                                </div>

                                <div className="mb-3">
                                    <label className="form-label" htmlFor="confirmPassword">Confirm Password</label>
                                    <input value={password_confirmation} onChange={(e) => setPasswordConfirmation(e.target.value)} type="password" name="confirmPassword" id="confirmPassword" className="form-control" />
                                </div>

                                <div className="d-grid gap-2 col-4 mx-auto">
                                    <button className="btn btn-primary" type="submit">Register</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </App>
    );
}

export default Register;

