import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
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

const slider = () => {
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
				<img src={safari} alt="uganda safaris" />
				<img src={buffalo} alt="uganda safaris" />
				<img src={sunset} alt="uganda safaris" />
				<img src={zebra} alt="uganda safaris" />
				<img src={holiday} alt="uganda safaris" />
				<img src={mountain} alt="uganda safaris" />
			</Slider>
		</div>
	);
};

export default slider;
