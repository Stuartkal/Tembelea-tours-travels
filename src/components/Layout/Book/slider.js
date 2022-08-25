import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const slider = ({ gallery }) => {
	console.log(gallery.map((g) => g));
	const settings = {
		dots: true,
		dotsClass: 'slick-dots slick-thumb',
		infinite: true,
		speed: 500,
		slidesToShow: 1,
		slidesToScroll: 1
	};

	return (
		<div className="book-slider-container">
			<Slider {...settings}>
				{gallery.map((r, index) => <img key={index} src={r} alt="ihanga tours and travels" />)}
			</Slider>
		</div>
	);
};

export default slider;
