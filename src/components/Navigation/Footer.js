import React from 'react';
import { db } from '../Layout/config/firebase';
const Footer = () => {
	React.useEffect(() => {
		getWebsitInfo();
	}, []);

	const [ info, setInfo ] = React.useState([]);

	const data = info && info.slice(-1).pop();
	// console.log(data);

	const getWebsitInfo = async () => {
		try {
			db.collection('website-info').onSnapshot((snapshot) => {
				const website_info = [];
				snapshot.forEach((doc) => {
					const data = doc.data();
					website_info.push({ id: doc.id, ...data });
				});
				setInfo(website_info);
			});
		} catch (err) {
			console.log(err);
		}
	};

	return (
		<div className="footer-container">
			<div className="footer-main">
				<div className="footer-left">
					<h1>Contact US</h1>
					<div className="separator" />
					<h5>
						Tel: <strong>{!data ? <p>Travel with us for a memorable experience</p> : data.phone}</strong>
					</h5>
					<h5>
						Email: <strong>{!data ? <p>Travel with us for a memorable experience</p> : data.email}</strong>
					</h5>
					<h5>
						Whatsapp No.:{' '}
						<strong>{!data ? <p>Travel with us for a memorable experience</p> : data.whatsapp}</strong>
					</h5>
				</div>
				<div className="footer-right">
					<h1>About US</h1>
					<div className="separator" />
					<p>
						Ihanga Tours and Travels is a specialist safari and destination management company that provides
						a wide range of services for tourists and travelers. We are a registered company based in
						Kampala on Mbogo road.
					</p>
				</div>
			</div>
		</div>
	);
};
export default Footer;
