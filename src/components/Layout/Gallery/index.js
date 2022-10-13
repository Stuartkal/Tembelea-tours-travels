import React from 'react';
import Footer from '../../Navigation/Footer';
import Share from '../ModalUI/Share';
import ImageGallery from 'react-image-gallery';
// import { db } from '../config/firebase';

import 'react-image-gallery/styles/css/image-gallery.css';
import './Styles.css';
const Gallery = () => {
	const images = [
		{
			original: 'https://res.cloudinary.com/starthub-africa/image/upload/v1661852776/dreorevubovimp2a9fb7.jpg',
			thumbnail: 'https://res.cloudinary.com/starthub-africa/image/upload/v1661852776/dreorevubovimp2a9fb7.jpg'
		},
		{
			original: 'https://res.cloudinary.com/starthub-africa/image/upload/v1661852798/ceb3ft2izdssahhiy7ek.jpg',
			thumbnail: 'https://res.cloudinary.com/starthub-africa/image/upload/v1661852798/ceb3ft2izdssahhiy7ek.jpg'
		},
		{
			original: 'https://res.cloudinary.com/starthub-africa/image/upload/v1661852793/dtzkxgz4ufmr8ifvcymz.jpg',
			thumbnail: 'https://res.cloudinary.com/starthub-africa/image/upload/v1661852793/dtzkxgz4ufmr8ifvcymz.jpg'
		},
		{
			original: 'https://res.cloudinary.com/starthub-africa/image/upload/v1661883135/ip7uq00bvmpfcp5lz4sa.jpg',
			thumbnail: 'https://res.cloudinary.com/starthub-africa/image/upload/v1661883135/ip7uq00bvmpfcp5lz4sa.jpg'
		},
		{
			original: 'https://res.cloudinary.com/starthub-africa/image/upload/v1661852788/ofhpxlagzhexyvksidpc.jpg',
			thumbnail: 'https://res.cloudinary.com/starthub-africa/image/upload/v1661852788/ofhpxlagzhexyvksidpc.jpg'
		},
		{
			original: 'https://res.cloudinary.com/starthub-africa/image/upload/v1661852793/dtzkxgz4ufmr8ifvcymz.jpg',
			thumbnail: 'https://res.cloudinary.com/starthub-africa/image/upload/v1661852793/dtzkxgz4ufmr8ifvcymz.jpg'
		}
	];

	return (
		<div className="gallery-container">
			<div className="gallery-main">
				<ImageGallery items={images} />
			</div>
			<Share url="https://www.ihangatoursandtravels.com/gallery" />
			<Footer />
		</div>
	);
};
export default Gallery;
