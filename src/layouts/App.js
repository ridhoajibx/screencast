import React from 'react'
import Navigation from '../components/Navigation';

export default function App(props) {
    document.title = props.title;
    return (
        <div>
            <Navigation />
            <main className="mt-5 py-4">
                {props.children}
            </main>
            <div className="bg-light mt-5 py-4 border-top">
                <div className="container">
                    ridhoajibx &trade;
                </div>
            </div>
        </div>
    )
}
