import axios from 'axios';
import React, { useState } from 'react';
import { useHistory } from 'react-router';
import { useSetRecoilState } from 'recoil';
import Logo from '../../components/Logo';
import App from '../../layouts/App';
import { authenticatedUser } from '../../store';

const Login = (props) => {
    let history = useHistory()
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('')
    const [errors, setErrors] = useState([]);

    let credentials = { email, password }
    const setAuth = useSetRecoilState(authenticatedUser);

    const submitHandler = async (e) => {
        e.preventDefault();
        try {
            await axios.get('/sanctum/csrf-cookie')
            await axios.post('/login', credentials)

            let { data } = await axios.get('/api/me')
            setAuth({
                user: data.data,
                check: true
            })
            history.push('/dashboard')
        } catch ({ response }) {
            setErrors(response.data.errors)
        }
    }

    return (
        <App title="login">
            <div className="row">
                <div className="col-md-6 offset-md-3">
                    <Logo className="mb-4 d-flex justify-content-center align-items-center" />
                    <div className="card">
                        <div className="card-body px-4">
                            <form onSubmit={submitHandler}>
                                <div className="mb-3">
                                    <label className="form-label" htmlFor="email">Email</label>
                                    <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" name="email" id="email" className="form-control" />
                                    {errors.email && errors.email.map((error, i) => (
                                        <div className="text-danger mt-1" key={i}>
                                            {error}
                                        </div>
                                    ))}
                                </div>

                                <div className="mb-3">
                                    <label className="form-label" htmlFor="password">Password</label>
                                    <input value={password} onChange={(e) => setPassword(e.target.value)} type="password" name="password" id="password" className="form-control" />
                                    {errors.password && errors.password.map((error, i) => (
                                        <div className="text-danger mt-1" key={i}>
                                            {error}
                                        </div>
                                    ))}
                                </div>

                                <div className="d-flex justify-content-end">
                                    <button className="btn btn-primary btn-sm px-4 py-2" type="submit">Login</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </App>
    );
}

export default Login;
