import React from 'react'
import App from '../../layouts/App'

export default function Dashboard() {
    return (
        <App title="Payment Success">
            <div className="container py-5">
                <div className="row">
                    <div className="alert alert-success alert-dismissible fade show" role="alert">
                        <strong>Thank you!</strong> Your payment successfully!
                        <button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close" />
                    </div>
                </div>
            </div>
        </App>
    )
}
