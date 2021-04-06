import axios from 'axios';
import React, { useState } from 'react';
import { useHistory } from 'react-router';
import { useSetRecoilState } from 'recoil';
import Logo from '../../components/Logo';
import App from '../../layouts/App';
import { authenticatedUser } from '../../store';

const Register = (props) => {
    let history = useHistory()
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('')
    const [password_confirmation, setPasswordConfirmation] = useState('')
    const [errors, setErrors] = useState([])

    const setAuth = useSetRecoilState(authenticatedUser);
    let credentials = { name, email, password, password_confirmation }

    const submitHandler = async (e) => {
        e.preventDefault();
        try {
            let { data } = await axios.post('/register', credentials)
            setAuth({
                user: data.user,
                check: true
            })
            history.push('/dashboard')
        } catch ({ response }) {
            setErrors(response.data.errors);
            console.log(response.data)
        }
    }

    return (
        <App title="Register">
            <div className="container">
                <div className="row">
                    <div className="col-md-6 offset-md-3 py-4 mt-2">
                        <Logo className="mb-4 d-flex justify-content-center align-items-center" />
                        <div className="card shadow-lg">
                            <div className="card-body px-4">
                                <form onSubmit={submitHandler}>
                                    <div className="mb-3">
                                        <label className="form-label" htmlFor="name">Name</label>
                                        <input value={name} onChange={(e) => setName(e.target.value)} type="text" name="name" id="name" className="form-control" />
                                        {errors.name && errors.name.map((error, i) => (
                                            <div className="text-danger mt-1" key={i}>
                                                {error}
                                            </div>
                                        ))}
                                    </div>

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

                                    <div className="mb-3">
                                        <label className="form-label" htmlFor="confirmPassword">Confirm Password</label>
                                        <input value={password_confirmation} onChange={(e) => setPasswordConfirmation(e.target.value)} type="password" name="confirmPassword" id="confirmPassword" className="form-control" />
                                    </div>

                                    <div className="d-flex justify-content-end">
                                        <button className="btn btn-primary btn-sm px-4 py-2" type="submit">Register</button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </App>
    );
}

export default Register;

