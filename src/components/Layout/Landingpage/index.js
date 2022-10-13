import React from 'react';
import { useNavigate } from 'react-router-dom';
import emailjs from '@emailjs/browser';
import giraffe from '../../../assets/images/giraffe.jpg';
import safari from '../../../assets/images/safari.jpg';
import sunset from '../../../assets/images/sunset.jpg';
import buffalo from '../../../assets/images/buffalo.jpg';
import zebra from '../../../assets/images/zebra.jpg';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import Footer from '../../Navigation/Footer';
import FloatingWhatsApp from 'react-floating-whatsapp';
import logo from '../../../assets/images/logo3.png';
import { db } from '../config/firebase';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import apiKeys from '../Book/emailkey';
import Share from '../ModalUI/Share';

import './Styles.css';
const LandingPage = () => {
	const navigate = useNavigate();

	const [ data, setData ] = React.useState([]);
	const [ loading, setLoading ] = React.useState(false);
	const [ loader, setLoader ] = React.useState('');
	const [ state, setState ] = React.useState({
		name: '',
		contact: '',
		email: '',
		country: '',
		comment: ''
	});

	const form = React.useRef();

	const [ info, setInfo ] = React.useState([]);

	const info_doc = info && info.slice(-1).pop();

	const sendEmail = (e) => {
		if (state.name === '' || state.contact === '' || state.email === '') return;
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

	// console.log(info_doc);

	React.useEffect(() => {
		getData();
		getWebsitInfo();
	}, []);

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

	const getData = async () => {
		setLoader('Travel with us for a memorable experience');
		try {
			db.collection('trips').onSnapshot((snapshot) => {
				const trips = [];
				snapshot.forEach((doc) => {
					const data = doc.data();
					trips.push({ id: doc.id, ...data });
				});
				setData(trips);
				setLoader('');
			});
		} catch (err) {
			console.log(err);
		}
	};

	return (
		<div className="landing-container">
			<div className="backdrop">
				<div className="backdrop-row">
					<div className="backdrop-row-left">
						<h1>{!info_doc ? null : info_doc.title}</h1>
						<p>{!info_doc ? null : info_doc.status}</p>
					</div>
					<form ref={form} onSubmit={sendEmail} className="backdrop-form">
						<Accordion style={{ width: '100%' }}>
							<AccordionSummary
								expandIcon={<ExpandMoreIcon />}
								aria-controls="panel1a-content"
								id="panel1a-header"
								style={{ background: '#2b4400' }}
							>
								<h3 style={{ color: '#fff' }}>Book Now</h3>
							</AccordionSummary>
							<AccordionDetails style={{ background: '#1f2933' }}>
								<div className="backdrop-row-right">
									<div className="backdrop-form-column">
										<input
											type="text"
											name="name"
											placeholder="name"
											onChange={(e) => setState({ ...state, name: e.target.value })}
										/>
										<input
											type="tel"
											name="phone"
											placeholder="phone"
											onChange={(e) => setState({ ...state, contact: e.target.value })}
										/>
										<input
											type="email"
											name="email"
											placeholder="email"
											onChange={(e) => setState({ ...state, email: e.target.value })}
										/>
										<input
											type="text"
											name="country"
											placeholder="country"
											onChange={(e) => setState({ ...state, country: e.target.value })}
										/>
										<textarea
											name="comment"
											placeholder="comment"
											onChange={(e) => setState({ ...state, comment: e.target.value })}
										/>
									</div>
									<button type="submit">{loading ? 'Booking' : 'Book Now'}</button>
								</div>
							</AccordionDetails>
						</Accordion>
					</form>
				</div>
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
			{loader ? (
				<h1 style={{ textAlign: 'center', color: '#fff' }}>{loader}</h1>
			) : (
				<div className="content">
					{data.map((r, index) => (
						<div key={index} className="card">
							<div className="ribbon">
								{r.days === '1' ? <h3>{r.days} Day</h3> : <h3>{r.days} Days</h3>}
							</div>
							<img src={r.featuredimageLink} alt="uganda safaris" />
							<div className="card-content">
								<h3>{r.trip}</h3>
								<div className="text-row">
									<h5>{r.location}</h5>
									<LocationOnIcon
										style={{
											fontSize: '18px',
											color: 'rgba(255, 255, 255, 0.732)',
											marginLeft: '0.2rem'
										}}
									/>
								</div>
								<div className="card-row">
									<button onClick={() => navigate('/book-trip', { state: r })}>Explore</button>
								</div>
							</div>
						</div>
					))}
				</div>
			)}
			<Share url="https://www.ihangatoursandtravels.com/" />
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

export default LandingPage;
