import React from 'react'
import { useRecoilValue } from 'recoil'
import Header from '../components/Header';
import App from '../layouts/App'
import { authenticatedUser } from '../store'

export default function Dashboard() {
    const auth = useRecoilValue(authenticatedUser);
    return (
        <App title="Dashboard">
            <Header title="Dashboard">
                Welcome back, <span className="fw-bold">{auth.user.name}</span> !
            </Header>
        </App>
    )
}
