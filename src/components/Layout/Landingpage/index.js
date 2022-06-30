import React from 'react';
import { useNavigate } from 'react-router-dom';
import giraffe from '../../../assets/images/giraffe.jpg';
import safari from '../../../assets/images/safari.jpg';
import sunset from '../../../assets/images/sunset.jpg';
import buffalo from '../../../assets/images/buffalo.jpg';
import zebra from '../../../assets/images/zebra.jpg';
import apoka from '../../../assets/images/apoka.jpg';
import murchisons from '../../../assets/images/murchisons.jpg';
import holiday from '../../../assets/images/holiday.jpg';
import mountain from '../../../assets/images/mountain.jpg';
import rafting from '../../../assets/images/rafting.jpg';
import days from '../../../assets/images/7days.jpg';
import LocationOnIcon from '@mui/icons-material/LocationOn';

import './Styles.css';
const LandingPage = () => {
	const navigate = useNavigate();

	const data = [
		{
			trip: 'Gorilla Trekking',
			location: 'Kibale National Park',
			charge: '350,000',
			image: days
		},
		{
			trip: 'Water Rafting',
			location: 'Jinja',
			charge: '400,000',
			image: rafting
		},
		{
			trip: 'Mountain Climbing',
			location: 'Mountain Rwenzori',
			charge: '500,000',
			image: mountain
		},
		{
			trip: 'Kanyanchu Visitors’ Centre',
			location: 'Honeymoon',
			charge: '300,000',
			image: holiday
		},
		{
			trip: 'Murchisons Falls Tour',
			location: 'Murchisons Falls National Park',
			charge: '550,000',
			image: murchisons
		},
		{
			trip: 'Family Vacation',
			location: 'Apoke Lodge',
			charge: '600,000',
			image: apoka
		}
	];

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
						<img src={r.image} alt="uganda safaris" />
						<div className="card-content">
							<h3>{r.trip}</h3>
							<div className="text-row">
								<h5>{r.location}</h5>
								<LocationOnIcon
									style={{ fontSize: '18px', color: 'rgba(0, 0, 0, 0.2)', marginLeft: '0.5rem' }}
								/>
							</div>
							<div className="card-row">
								<div className="row">
									<p style={{ color: 'green', fontWeight: 'bold' }}>{r.charge}UGX</p>
									<p>/person</p>
								</div>
								<button onClick={() => navigate('/book-trip', { state: r })}>Book</button>
							</div>
						</div>
					</div>
				))}
			</div>
		</div>
	);
};

export default LandingPage;
