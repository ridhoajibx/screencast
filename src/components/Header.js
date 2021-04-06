import React from 'react';

const Header = (props) => {
    return (
        <div className="bg-light py-4 mb-5 shadow-sm">
            <div className="container">
                <div className="row">
                    <div className="col-md-6">
                        <h3>{props.title}</h3>
                        <hr className="dropdown-divider" style={{ width: "10%", height: '5px' }} />
                        <div className="text-secondary mb-4">
                            {props.children}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Header;
