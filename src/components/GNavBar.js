import {Link} from "react-router-dom";
import React from "react";

const GNavBar = () => (
    <nav className="nav bg-dark">
        <h1 className="nav__logo h1 text-white">Crime Report</h1>
        <ul className="nav__links">
            <li className="nav__item">
                <Link to="/" className="nav__link">Home</Link>
            </li>
            <li className="nav__item">
                <Link to="/about" className="nav__link">About</Link>
            </li>
            <li className="nav__item">
                        <Link to="/login" className="nav__link">Login</Link>
            </li>
        </ul>
    </nav>
)

export default GNavBar;