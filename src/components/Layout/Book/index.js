import React, { useState, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import emailjs from '@emailjs/browser';
import apiKeys from './emailkey';
import Slider from './slider';
import { Tabs } from 'antd';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import Footer from '../../Navigation/Footer';
import FloatingWhatsApp from 'react-floating-whatsapp';
import logo from '../../../assets/images/logo3.png';
import Share from '../ModalUI/Share';

import './Styles.css';
import 'antd/dist/antd.min.css';

const { TabPane } = Tabs;

const Book = () => {
	const [ State, setState ] = useState({
		startDate: '',
		endDate: '',
		name: '',
		contact: '',
		county: '',
		comment: '',
		email: '',
		phone: '',
		note: ''
	});
	const [ loading, setLoading ] = useState(false);

	const { state } = useLocation();
	const form = useRef();

	// console.log(State);

	const sendEmail = (e) => {
		if (State.name === '' || State.contact === '' || State.email === '') return;
		e.preventDefault();
		setLoading(true);
		emailjs.sendForm(apiKeys.SERVICE_ID, apiKeys.TEMPLATE_ID, form.current, apiKeys.USER_ID).then(
			(result) => {
				setState({
					startDate: '',
					endDate: '',
					name: '',
					phone: '',
					county: '',
					comment: '',
					email: ''
				});
				alert('Message Sent, We will get back to you shortly', result.text);
				setLoading(false);
			},
			(error) => {
				alert('An error occurred, Please try again', error.text);
			}
		);
	};

	function createMarkup() {
		return { __html: state.description };
	}

	return (
		<div className="booking-conatiner">
			<div className="book-main">
				<div className="book-left-column">
					<h1>{state.trip}</h1>
					<div className="header-text-row">
						<h5>{state.location}</h5>
						<LocationOnIcon style={{ fontSize: '18px', color: 'rgba(0, 0, 0, 0.2)', marginBottom: '8' }} />
					</div>
					<Slider gallery={state.gallery} />
					{/* <hr style={{ background: 'red' }} /> */}
					<div className="description">
						{/* <h2>Description</h2> */}
						<div className="html" dangerouslySetInnerHTML={createMarkup()} />
					</div>
				</div>
				<div className="book-right-column">
					<div className="amount">
						<h2>Inquiry</h2>
					</div>
					<form ref={form} onSubmit={sendEmail}>
						<div className="guest-form">
							<div className="guest-form-column">
								<h4>Name</h4>
								<input
									type="text"
									name="name"
									onChange={(e) => setState({ ...State, name: e.target.value })}
								/>
								<h4>Contact</h4>
								<input
									type="tel"
									name="phone"
									onChange={(e) => setState({ ...State, contact: e.target.value })}
								/>
								<h4>Email</h4>
								<input
									type="email"
									name="email"
									onChange={(e) => setState({ ...State, email: e.target.value })}
								/>
								<h4>Country of Residence</h4>
								<input
									type="text"
									name="country"
									onChange={(e) => setState({ ...State, country: e.target.value })}
								/>
								<h4>Comment</h4>
								<textarea
									name="comment"
									onChange={(e) => setState({ ...State, comment: e.target.value })}
								/>
							</div>
							<button type="submit">{loading ? 'Sending' : 'Send'}</button>
						</div>
					</form>
					{/* <TabPane tab="INQUIRY" key="2" className="tab-pane">
							<input
								placeholder="Name"
								type="text"
								onChange={(e) => setState({ ...State, name2: e.target.value })}
							/>
							<input
								placeholder="Email"
								type="email"
								onChange={(e) => setState({ ...State, email: e.target.value })}
							/>
							<input
								placeholder="Phone"
								type="tel"
								onChange={(e) => setState({ ...State, phone: e.target.value })}
							/>
							<textarea
								placeholder="Note"
								type="text"
								onChange={(e) => setState({ ...State, note: e.target.value })}
							/>
							<button>send</button>
						</TabPane> */}
				</div>
			</div>
			<Share url="https://www.ihangatoursandtravels.com" />
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

export default Book;
