import React from 'react';
import { useLocation } from 'react-router-dom';
import Footer from '../../Navigation/Footer';
import Share from '../ModalUI/Share';

const Details = () => {
	const { state } = useLocation();

	return (
		<div className="blog-container">
			<div className="details-main">
				<img src={state.featuredimageLink} alt="ihanga tours" />
				<div className="details-content">
					<h1>{state.title}</h1>
					<h4>{state.desc}</h4>
					<Share url="https://www.ihangatoursandtravels.com/blog" />
				</div>
			</div>
			<Footer />
		</div>
	);
};

export default Details;
