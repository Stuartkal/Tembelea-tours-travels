import React, { useState, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import emailjs from '@emailjs/browser';
import apiKeys from './emailkey';
import Slider from './slider';
import { Tabs, DatePicker, Space } from 'antd';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import Footer from '../../Navigation/Footer';
import FloatingWhatsApp from 'react-floating-whatsapp';
import logo from '../../../assets/images/logo3.png';

import './Styles.css';
import 'antd/dist/antd.css';

const { TabPane } = Tabs;
const { RangePicker } = DatePicker;

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
					email: '',
					phone: ''
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
					<hr />
					<div className="description">
						{/* <h2>Description</h2> */}
						<div className="html" dangerouslySetInnerHTML={createMarkup()} />
					</div>
				</div>
				<div className="book-right-column">
					<div className="amount">
						<h2>Contact Us</h2>
					</div>
					<Tabs defaultActiveKey="1" centered tabBarStyle={{ color: 'green' }}>
						<TabPane tab="BOOK" key="1" className="tab-pane">
							<form ref={form} onSubmit={sendEmail}>
								{/* <h3>CheckIn & CheckOut</h3>
								<div className="tab-pane-row-label">
									<p>Start Date</p>
									<p>End Date</p>
								</div>
								<div className="tab-pane-row">
									<input type="date" name="start" />
									<input type="date" name="end" />
								</div> */}
								<Accordion style={{ width: '100%', marginBottom: '1rem' }}>
									<AccordionSummary
										expandIcon={<ExpandMoreIcon />}
										aria-controls="panel1a-content"
										id="panel1a-header"
									>
										<h3>Booking Details</h3>
									</AccordionSummary>
									<AccordionDetails>
										<div className="guest-form">
											<div className="guest-form-column">
												<h4>Name</h4>
												<h4>Contact</h4>
												<h4>Email</h4>
												<h4>Country of Residence</h4>
												<h4>Comment</h4>
											</div>
											<div className="guest-form-column">
												<input
													type="text"
													name="name"
													onChange={(e) => setState({ ...State, name: e.target.value })}
												/>
												<input
													type="tel"
													name="phone"
													onChange={(e) => setState({ ...State, contact: e.target.value })}
												/>
												<input
													type="email"
													name="email"
													onChange={(e) => setState({ ...State, email: e.target.value })}
												/>
												<input
													type="text"
													name="country"
													onChange={(e) => setState({ ...State, country: e.target.value })}
												/>
												<textarea
													name="comment"
													onChange={(e) => setState({ ...State, comment: e.target.value })}
												/>
											</div>
										</div>
									</AccordionDetails>
								</Accordion>
								<button type="submit">{loading ? 'Booking' : 'Book Now'}</button>
							</form>
						</TabPane>
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
					</Tabs>
				</div>
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

export default Book;
