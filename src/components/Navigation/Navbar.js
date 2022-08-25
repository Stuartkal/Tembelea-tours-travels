import React from 'react';
import { useNavigate } from 'react-router-dom';
import logo1 from '../../assets/images/logo1.png';
import EmailIcon from '@mui/icons-material/Email';
import PhoneIphoneIcon from '@mui/icons-material/PhoneIphone';

import './Styles.css';
const Navbar = () => {
	const navigate = useNavigate();

	return (
		<div className="nav-container">
			<div className="nav-header">
				<div className="nav-header-row">
					<PhoneIphoneIcon className="nav-icon" style={{ fontSize: '20px' }} />
					<h4>+256 705 950815</h4>
				</div>
				<div className="nav-header-row">
					<EmailIcon className="nav-icon" style={{ fontSize: '20px', marginLeft: '1rem' }} />
					<h4>Ihangatoursandtravels@gmail.com</h4>
				</div>
			</div>
			<div className="nav-content">
				<div className="logo">
					<img onClick={() => navigate('/')} src={logo1} alt="tour uganda" />
				</div>
				<div className="profile">{/* <button>login</button> */}</div>
				<div className="links">
					<h4 onClick={() => navigate('/')}>Home</h4>
					{/* <h4>About</h4>
                    <h4>Contact Us</h4> */}
				</div>
			</div>
		</div>
	);
};

export default Navbar;
