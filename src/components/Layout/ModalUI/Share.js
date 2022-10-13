import React from 'react';
import {
	FacebookShareButton,
	FacebookIcon,
	LinkedinShareButton,
	LinkedinIcon,
	TwitterShareButton,
	TwitterIcon,
	WhatsappShareButton,
	WhatsappIcon
} from 'react-share';

import './Styles.css';
const Share = ({ url }) => {
	return (
		<div className="share-container">
			<FacebookShareButton url={url}>
				<FacebookIcon logofillcolor="white" size={50} round={true} />
			</FacebookShareButton>
			<TwitterShareButton url={url}>
				<TwitterIcon logofillcolor="white" size={50} round={true} />
			</TwitterShareButton>
			<LinkedinShareButton url={url}>
				<LinkedinIcon logofillcolor="white" size={50} round={true} />
			</LinkedinShareButton>
			<WhatsappShareButton url={url}>
				<WhatsappIcon logofillcolor="white" size={50} round={true} />
			</WhatsappShareButton>
		</div>
	);
};

export default Share;
