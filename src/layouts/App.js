import React from 'react'
import Navigation from '../components/Navigation';

export default function App(props) {
    document.title = props.title;
    return (
        <div>
            <Navigation />
            <main className="mt-5 py-4">
                <div className="container mt-4">
                    {props.children}
                </div>
            </main>
        </div>
    )
}
