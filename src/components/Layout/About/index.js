import React from 'react';
import Footer from '../../Navigation/Footer';
import Share from '../ModalUI/Share';
import { db } from '../config/firebase';

import './Styles.css';
const AboutUs = () => {
	const [ info, setInfo ] = React.useState([]);

	const info_doc = info && info.slice(-1).pop();

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

	React.useEffect(() => {
		getWebsitInfo();
	}, []);

	function createMarkup() {
		return { __html: info_doc.about };
	}

	return (
		<div className="aboutUs-container">
			<div className="aboutUs-main">
				{!info_doc ? <h1>Hello</h1> : <div className="html" dangerouslySetInnerHTML={createMarkup()} />}
			</div>
			<Share url="https://www.ihangatoursandtravels.com/aboutUs" />
			<Footer />
		</div>
	);
};

export default AboutUs;
