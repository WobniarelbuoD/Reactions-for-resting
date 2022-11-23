import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from './AuthContext';

const Header = () => {
		const auth = useContext(AuthContext);
    return (
<nav className="navbar navbar-expand-xl navbar-expand-lg navbar-light bg-light px-5">
	<Link className="navbar-brand" to="/home">Creative Title</Link>
	<div className="d-flex" id="navbarNav">
<Link className="nav-link pe-3" to="/home">Home</Link>
<Link className="nav-link pe-3" to="/countries">Countries</Link>
<span className="nav-link mx-4">{`${auth.isLoggedin()}`}</span>
{!auth.isLoggedin() ? (
								<>
								<Link className="nav-link pe-3" to="/login">Login</Link>
								<Link className="nav-link" to="/register">Register</Link>
								</>
					) : (
								<>
								<span className="nav-link mx-4">{`Hello ${auth.getUser().name}`}</span>
								<Link className="nav-link" onClick={() => auth.logout()}>Logout</Link>
								</>
					)}
	</div>
</nav>

    );
};

export default Header;