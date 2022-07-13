import React from 'react';
import { useNavigate } from 'react-router-dom';
import logo1 from '../../assets/images/logo1.png';

import './Styles.css';
const Navbar = () => {
	const navigate = useNavigate();

	return (
		<div className="nav-container">
			<div className="nav-content">
				<div className="logo">
					<img onClick={() => navigate('/')} src={logo1} alt="tour uganda" />
				</div>
				<div className="links">
					{/* <h4 onClick={() => navigate('/')}>Home</h4> */}
					{/* <h4>About</h4>
                    <h4>Contact Us</h4> */}
				</div>
				<div className="profile">{/* <button>login</button> */}</div>
			</div>
		</div>
	);
};

export default Navbar;
