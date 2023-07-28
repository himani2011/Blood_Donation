import React from 'react';
import { NavLink } from 'react-router-dom';
import Logo from '../logo.png';

const Navbar = (props) => {
    return (
        <div>
            <nav className="navbar navbar-dark bg-dark navbar-expand-lg">
                <div className="container-fluid">
                    <a className="navbar-brand" href="/">BloodHelp</a><img src={Logo} alt='logo' style={{marginLeft:"-28px"}}/>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarNav">
                        <ul className="navbar-nav ms-auto mb-2 mb-lg-o">
                            <li className="nav-item">
                                <NavLink className="nav-link active" aria-current="page" to="/">Home</NavLink>
                            </li>
                            {
                                !props.auth ? 

                            <>
                            <li className="nav-item">
                                <NavLink className="nav-link" to="/dsignup">Donor signup</NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink className="nav-link" to="/osignup">Organization signup</NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink className="nav-link" to="/login">Login</NavLink>
                            </li>
                            </>

                                : 
                            
                            <li className="nav-item">
                                <NavLink className="nav-link" to="/logout">Logout</NavLink>
                            </li>
                            

                            }
                            
                            
                            {/* <li className="nav-item">
                                <a className="nav-link" href="/profile">Profile</a>
                            </li> */}
                            <li className="nav-item">
                                <NavLink className="nav-link" to="/faq">FAQs</NavLink>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        </div>
    )
}

export default Navbar
