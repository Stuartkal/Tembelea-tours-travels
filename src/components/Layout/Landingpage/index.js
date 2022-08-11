import React from 'react';
import { useNavigate } from 'react-router-dom';
import giraffe from '../../../assets/images/giraffe.jpg';
import safari from '../../../assets/images/safari.jpg';
import sunset from '../../../assets/images/sunset.jpg';
import buffalo from '../../../assets/images/buffalo.jpg';
import zebra from '../../../assets/images/zebra.jpg';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import Footer from '../../Navigation/Footer';
import FloatingWhatsApp from 'react-floating-whatsapp';
import logo from '../../../assets/images/logo3.png';
import { db } from '../config/firebase';

import './Styles.css';
const LandingPage = () => {
	const navigate = useNavigate();

	const [ data, setData ] = React.useState([]);

	// console.log(data);

	React.useEffect(() => {
		getData();
	}, []);

	const getData = async () => {
		try {
			db.collection('trips').onSnapshot((snapshot) => {
				const trips = [];
				snapshot.forEach((doc) => {
					const data = doc.data();
					trips.push({ id: doc.id, ...data });
				});
				setData(trips);
			});
		} catch (err) {
			console.log(err);
		}
	};

	// const data = [
	// 	{
	// 		trip: 'Gorilla Trekking',
	// 		location: 'Kibale National Park',
	// 		charge: '350,000',
	// 		image: days
	// 	},
	// 	{
	// 		trip: 'Water Rafting',
	// 		location: 'Jinja',
	// 		charge: '400,000',
	// 		image: rafting
	// 	},
	// 	{
	// 		trip: 'Mountain Climbing',
	// 		location: 'Mountain Rwenzori',
	// 		charge: '500,000',
	// 		image: mountain
	// 	},
	// 	{
	// 		trip: 'Kanyanchu Visitors’ Centre',
	// 		location: 'Honeymoon',
	// 		charge: '700,000',
	// 		image: holiday
	// 	},
	// 	{
	// 		trip: 'Murchisons Falls Tour',
	// 		location: 'Murchisons Falls National Park',
	// 		charge: '550,000',
	// 		image: murchisons
	// 	},
	// 	{
	// 		trip: 'Family Vacation',
	// 		location: 'Apoke Lodge',
	// 		charge: '600,000',
	// 		image: apoka
	// 	}
	// ];

	return (
		<div className="landing-container">
			<div className="backdrop">
				<h1>
					Live your <strong style={{ color: 'Green' }}>Adventure</strong>
				</h1>
				<p>
					Don't wait until tomorrow, discover your adventure now and feel the sensation <br />
					of closeness to nature around you
				</p>
			</div>
			<div id="slider" className="slider">
				<figure>
					<img src={zebra} alt="tours and travel uganda" />
					<img src={safari} alt="tours and travel uganda" />
					<img src={sunset} alt="tours and travel uganda" />
					<img src={buffalo} alt="tours and travel uganda" />
					<img src={giraffe} alt="tours and travel uganda" />
				</figure>
			</div>
			<div className="content">
				{data.map((r, index) => (
					<div key={index} className="card">
						<div className="ribbon">{r.days === '1' ? <h3>{r.days} Day</h3> : <h3>{r.days} Days</h3>}</div>
						<img src={r.featuredimageLink} alt="uganda safaris" />
						<div className="card-content">
							<h3>{r.trip}</h3>
							<div className="text-row">
								<h5>{r.location}</h5>
								<LocationOnIcon
									style={{
										fontSize: '18px',
										color: 'rgba(255, 255, 255, 0.732)',
										marginLeft: '0.2rem'
									}}
								/>
							</div>
							<div className="card-row">
								<button onClick={() => navigate('/book-trip', { state: r })}>Explore</button>
							</div>
						</div>
					</div>
				))}
			</div>
			<Footer />
			<FloatingWhatsApp
				phoneNumber="256705950815"
				accountName="Ihanga Tours And Travel"
				avatar={logo}
				chatMessage="Hello there, this is Ihanga Tours and Travels. How can we be of help"
			/>
		</div>
	);
};

export default LandingPage;
