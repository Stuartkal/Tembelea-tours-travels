import React from 'react';
import { db } from '../config/firebase';
import { EditorState, convertToRaw } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import draftToHtml from 'draftjs-to-html';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import { Spin } from 'antd';
import ModalUI from '../ModalUI';
import CloseIcon from '@material-ui/icons/Close';
import Dropzone from 'react-dropzone';
import axios from 'axios';
import { sha1 } from 'crypto-hash';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

const Edit = () => {
	const [ image, setImage ] = React.useState('');
	const [ message, setMessage ] = React.useState('');
	const [ msg, setMsg ] = React.useState('');
	const [ gallery, setGallery ] = React.useState([]);
	const [ info_gallery, setInfoGallery ] = React.useState([]);
	const [ images, setImages ] = React.useState([]);
	const [ data, setData ] = React.useState([]);
	const [ info, setInfo ] = React.useState([]);
	const [ modal_data, setModaldata ] = React.useState([]);
	const [ open, setOpen ] = React.useState(false);
	const [ visible1, setVisible1 ] = React.useState(false);
	const [ visible2, setVisible2 ] = React.useState(false);
	const [ visible3, setVisible3 ] = React.useState(false);
	const [ loader, setLoader ] = React.useState(false);
	const [ state, setState ] = React.useState({
		editorState: EditorState.createEmpty(),
		trip: '',
		days: '',
		location: ''
	});
	const [ update, setUpdate ] = React.useState({
		title: '',
		status: '',
		phone: '',
		email: '',
		whatsapp: '',
		about: '',
		slider: []
	});

	const info_doc = info[0];

	const onEditorStateChange = (e) => {
		setState({ ...state, editorState: e });
	};

	React.useEffect(() => {
		getData();
		getWebsitInfo();
	}, []);

	// console.log(info);

	const getData = async () => {
		try {
			db.collection('trips').onSnapshot((snapshot) => {
				const trips = [];
				snapshot.forEach((doc) => {
					const data = doc.data();
					trips.push({ id: doc.id, ...data });
				});
				setData(trips);
			});
		} catch (err) {
			console.log(err);
		}
	};

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

	function createMarkup() {
		return { __html: modal_data.description };
	}

	const handleChange = (e) => {
		setImage(e.target.files[0]);
	};

	const updateTitle = async () => {
		if (update.title === '') return setMessage('Invalid Input');
		setLoader(true);
		const data = {
			title: update.title,
			status: info_doc.status,
			phone: info_doc.phone,
			email: info_doc.email,
			whatsapp: info_doc.whatsapp,
			about: info_doc.about,
			slider: info_doc.slider
		};
		await db.collection('website-info').doc(info[0].id).set(data);
		setLoader(false);
		setUpdate({
			...update,
			title: ''
		});
	};

	const updateStatus = async () => {
		if (update.status === '') return setMessage('Invalid Input');
		setLoader(true);
		const data = {
			title: info_doc.title,
			status: update.status,
			phone: info_doc.phone,
			email: info_doc.email,
			whatsapp: info_doc.whatsapp,
			about: info_doc.about,
			slider: info_doc.slider
		};
		await db.collection('website-info').doc(info[0].id).set(data);
		setLoader(false);
		setUpdate({
			...update,
			status: ''
		});
	};

	const updatepContactInfo = async () => {
		if (update.phone === '' || update.email === '' || update.whatsapp === '') return setMessage('Invalid Input');
		setLoader(true);
		const data = {
			title: info_doc.title,
			status: info_doc.status,
			phone: update.phone,
			email: update.email,
			whatsapp: update.whatsapp,
			about: info_doc.about,
			slider: info_doc.slider
		};
		await db.collection('website-info').doc(info[0].id).set(data);
		setLoader(false);
		setUpdate({
			...update,
			phone: '',
			email: '',
			whatsapp: ''
		});
	};

	const updateAboutUs = async () => {
		if (update.about === '') return setMessage('Invalid Input');
		setLoader(true);
		const data = {
			title: info_doc.title,
			status: info_doc.status,
			phone: info_doc.phone,
			email: info_doc.email,
			whatsapp: info_doc.whatsapp,
			about: update.about,
			slider: info_doc.slider
		};
		await db.collection('website-info').doc(info[0].id).set(data);
		setLoader(false);
		setUpdate({
			...update,
			about: ''
		});
	};

	const uploadInfoGallery = async () => {
		if (update.slider.length === 0) return setMessage('No images selected');
		setMessage('Uploading images');
		let docs = [];
		const data = new FormData();
		update.slider.forEach((file) => {
			data.append('file', file);
			data.append('upload_preset', 'starthub_preset');
			axios
				.post('https://api.cloudinary.com/v1_1/starthub-africa/upload', data)
				.then((res) => {
					docs.push(res.data.secure_url);
					setInfoGallery(docs);
					setMessage('Images Uploaded');
				})
				.catch((err) => {
					console.log(err);
				});
		});
	};

	const updateInfoGallery = async () => {
		const data = {
			title: info_doc.title,
			status: info_doc.status,
			phone: info_doc.phone,
			email: info_doc.email,
			whatsapp: info_doc.whatsapp,
			about: info_doc.about,
			slider: info_gallery
		};
		await db.collection('website-info').doc(info[0].id).set(data);
		setMessage('Gallery Updated');
	};

	const updateTripFeaturedImage = async () => {
		if (!image) return setMessage('No image selected');
		setLoader(true);
		await deleteImage(modal_data.public_id);
		const data = new FormData();
		data.append('file', image);
		data.append('upload_preset', 'starthub_preset');
		await axios
			.post('https://api.cloudinary.com/v1_1/starthub-africa/upload', data)
			.then((res) => {
				// console.log(res.data);
				const update = {
					trip: modal_data.trip,
					days: modal_data.days,
					location: modal_data.location,
					featuredimageLink: res.data.url,
					public_id: res.data.public_id,
					gallery: modal_data.gallery,
					description: modal_data.description
				};
				db.collection('trips').doc(modal_data.id).set(update);
				setLoader(false);
				setState({
					editorState: EditorState.createEmpty(),
					trip: '',
					days: '',
					location: ''
				});
			})
			.catch((err) => {
				console.log(err);
			});
	};

	const uploadGallery = async () => {
		if (images.length === 0) return setMessage('No images selected');
		setMsg('Uploading Gallery');
		let docs = [];
		const data = new FormData();
		images.forEach((file) => {
			data.append('file', file);
			data.append('upload_preset', 'starthub_preset');
			axios
				.post('https://api.cloudinary.com/v1_1/starthub-africa/upload', data)
				.then((res) => {
					docs.push(res.data.secure_url);
					setGallery(docs);
					setMsg('Uploaded');
				})
				.catch((err) => {
					console.log(err);
				});
		});
	};

	const updateTripGallery = async () => {
		const data = {
			trip: modal_data.trip,
			days: modal_data.days,
			location: modal_data.location,
			featuredimageLink: modal_data.featuredimageLink,
			public_id: modal_data.public_id,
			gallery: gallery,
			description: modal_data.description
		};
		await db.collection('trips').doc(modal_data.id).set(data);
		setMessage('Gallery Updated');
		setMsg('');
		setState({
			editorState: EditorState.createEmpty(),
			trip: '',
			days: '',
			location: ''
		});
	};

	const updateTrip = async () => {
		if (state.trip === '') return setMessage('No trip details entered, Please enter trip details');
		setLoader(true);
		const data = {
			trip: state.trip,
			days: modal_data.days,
			location: modal_data.location,
			featuredimageLink: modal_data.featuredimageLink,
			public_id: modal_data.public_id,
			gallery: modal_data.gallery,
			description: modal_data.description
		};
		await db.collection('trips').doc(modal_data.id).set(data);
		setLoader(false);
		setVisible1(false);
		setState({
			editorState: EditorState.createEmpty(),
			trip: '',
			days: '',
			location: ''
		});
	};

	const updateTripDays = async () => {
		if (state.days === '') return setMessage('No trip days entered, Please enter trip days');
		setLoader(true);
		const data = {
			trip: modal_data.trip,
			days: state.days,
			location: modal_data.location,
			featuredimageLink: modal_data.featuredimageLink,
			public_id: modal_data.public_id,
			gallery: modal_data.gallery,
			description: modal_data.description
		};
		await db.collection('trips').doc(modal_data.id).set(data);
		setLoader(false);
		setVisible2(false);
		setState({
			editorState: EditorState.createEmpty(),
			trip: '',
			days: '',
			location: ''
		});
	};

	const updateTripLocation = async () => {
		if (state.location === '') return setMessage('No trip location entered, Please enter trip location');
		setLoader(true);
		const data = {
			trip: modal_data.trip,
			days: modal_data.days,
			location: state.location,
			featuredimageLink: modal_data.featuredimageLink,
			public_id: modal_data.public_id,
			gallery: modal_data.gallery,
			description: modal_data.description
		};
		await db.collection('trips').doc(modal_data.id).set(data);
		setLoader(false);
		setVisible3(false);
		setState({
			editorState: EditorState.createEmpty(),
			trip: '',
			days: '',
			location: ''
		});
	};

	const updateTripDescription = async () => {
		setLoader(true);
		const data = {
			trip: modal_data.trip,
			days: modal_data.days,
			location: modal_data.location,
			featuredimageLink: modal_data.featuredimageLink,
			public_id: modal_data.public_id,
			gallery: modal_data.gallery,
			description: draftToHtml(convertToRaw(state.editorState.getCurrentContent()))
		};
		await db.collection('trips').doc(modal_data.id).set(data);
		setLoader(false);
		setState({
			editorState: EditorState.createEmpty(),
			trip: '',
			days: '',
			location: ''
		});
	};

	const deleteImage = async (public_id) => {
		const timestamp = new Date().getTime();
		const string = `public_id=${public_id}&timestamp=${timestamp}${process.env.REACT_APP_SECRET_KEY}`;
		const signature = await sha1(string);
		const formData = new FormData();
		formData.append('public_id', public_id);
		formData.append('signature', signature);
		formData.append('api_key', process.env.REACT_APP_API_KEY);
		formData.append('timestamp', timestamp);

		await axios
			.post('https://api.cloudinary.com/v1_1/starthub-africa/image/destroy', formData)
			.then((res) => {
				// console.log(res);
			})
			.catch((err) => {
				console.log(err);
			});
	};

	return (
		<div className="description-main">
			{open && modal_data !== undefined ? (
				<ModalUI>
					<div className="modal">
						<div className="modal-header">
							<h2>Update Trip</h2>
							{message ? <h3>{message}</h3> : null}
							{loader ? <Spin /> : null}
							<CloseIcon
								onClick={() => setOpen(false)}
								style={{ fontsize: '20px', color: 'rgba(0,0,0,0.2)' }}
							/>
						</div>
						<div className="modal-main">
							<div className="modal-content">
								<div className="modal-row">
									<input type="file" onChange={handleChange} style={{ border: 'none' }} />
									<button onClick={updateTripFeaturedImage}>Update featured Image</button>
								</div>
								<div className="modal-row">
									<Dropzone onDrop={(acceptedFiles) => setImages(acceptedFiles)}>
										{({ getRootProps, getInputProps }) => (
											<section>
												<div {...getRootProps()}>
													<input {...getInputProps()} />
													<p>
														Drag 'n' drop some files here, or click to select gallery images
													</p>
												</div>
											</section>
										)}
									</Dropzone>
									{msg ? <h4>{msg}</h4> : <button onClick={uploadGallery}>Upload gallery</button>}
									{msg ? <button onClick={updateTripGallery}>Update gallery</button> : null}
								</div>
								<div className="modal-row">
									<h3>{modal_data.trip}</h3>
									{visible1 ? (
										<input
											placeholder="Enter trip"
											value={state.trip}
											onChange={(e) => setState({ ...state, trip: e.target.value })}
										/>
									) : null}
									{!visible1 ? <button onClick={() => setVisible1(true)}>Edit</button> : null}
									{visible1 ? <button onClick={updateTrip}>Update trip</button> : null}
									{visible1 ? <button onClick={() => setVisible1(false)}>Cancel</button> : null}
								</div>
								<div className="modal-row">
									<h3>{modal_data.days}</h3>
									{visible2 ? (
										<input
											placeholder="Enter days"
											type="number"
											min="0"
											value={state.days}
											onChange={(e) => setState({ ...state, days: e.target.value })}
										/>
									) : null}
									{!visible2 ? <button onClick={() => setVisible2(true)}>Edit</button> : null}
									{visible2 ? <button onClick={updateTripDays}>Update trip days</button> : null}
									{visible2 ? <button onClick={() => setVisible2(false)}>Cancel</button> : null}
								</div>
								<div className="modal-row">
									<h3>{modal_data.location}</h3>
									{visible3 ? (
										<input
											placeholder="Enter location"
											value={state.location}
											onChange={(e) => setState({ ...state, location: e.target.value })}
										/>
									) : null}
									{!visible3 ? <button onClick={() => setVisible3(true)}>Edit</button> : null}
									{visible3 ? (
										<button onClick={updateTripLocation}>Update trip location</button>
									) : null}
									{visible3 ? <button onClick={() => setVisible3(false)}>Cancel</button> : null}
								</div>
								<Editor
									editorState={state.editorState}
									wrapperClassName="demo-wrapper"
									editorClassName="demo-editor"
									onEditorStateChange={onEditorStateChange}
									placeholder="Type description here..."
								/>
								<button onClick={updateTripDescription}>Update trip description</button>
								<h3>Trip Description</h3>
								<div className="html" dangerouslySetInnerHTML={createMarkup()} />
							</div>
						</div>
					</div>
				</ModalUI>
			) : null}
			<div className="description-row">
				<div className="edit-container">
					{data.map((t) => (
						<div className="ecard" key={t.id}>
							<img src={t.featuredimageLink} />
							<div className="ecard-content">
								<h3>{t.trip}</h3>
								<h4>{t.location}</h4>
								<div className="ecard-row ">
									<button
										onClick={() => {
											setModaldata(t);
											setOpen(true);
											setMessage('');
										}}
									>
										edit
									</button>
									<button onClick={() => db.collection('trips').doc(t.id).delete()}>delete</button>
								</div>
							</div>
						</div>
					))}
				</div>
				<div className="description-sidebar">
					<Accordion style={{ width: '100%' }}>
						<AccordionSummary
							expandIcon={<ExpandMoreIcon />}
							aria-controls="panel1a-content"
							id="panel1a-header"
						>
							<h3>Site Title</h3>
						</AccordionSummary>
						<AccordionDetails>
							<div className="sidebar-cards">
								<textarea
									placeholder="type..."
									value={update.title}
									onChange={(e) => setUpdate({ ...update, title: e.target.value })}
								/>
								<button onClick={updateTitle}>post</button>
								{loader ? <Spin /> : null}
								{message ? <p>{message}</p> : null}
							</div>
						</AccordionDetails>
					</Accordion>
					<Accordion style={{ width: '100%' }}>
						<AccordionSummary
							expandIcon={<ExpandMoreIcon />}
							aria-controls="panel1a-content"
							id="panel1a-header"
						>
							<h3>Site Status</h3>
						</AccordionSummary>
						<AccordionDetails>
							<div className="sidebar-cards">
								<textarea
									placeholder="type..."
									value={update.status}
									onChange={(e) => setUpdate({ ...update, status: e.target.value })}
								/>
								<button onClick={updateStatus}>post</button>
								{loader ? <Spin /> : null}
								{message ? <p>{message}</p> : null}
							</div>
						</AccordionDetails>
					</Accordion>
					<Accordion style={{ width: '100%' }}>
						<AccordionSummary
							expandIcon={<ExpandMoreIcon />}
							aria-controls="panel1a-content"
							id="panel1a-header"
						>
							<h3>Contact Us</h3>
						</AccordionSummary>
						<AccordionDetails>
							<div className="sidebar-cards">
								<input
									placeholder="phone"
									value={update.phone}
									onChange={(e) => setUpdate({ ...update, phone: e.target.value })}
								/>
								<input
									placeholder="email"
									value={update.email}
									onChange={(e) => setUpdate({ ...update, email: e.target.value })}
								/>
								<input
									placeholder="whatsapp"
									value={update.whatsapp}
									onChange={(e) => setUpdate({ ...update, whatsapp: e.target.value })}
								/>
								<button onClick={updatepContactInfo}>post</button>
								{loader ? <Spin /> : null}
								{message ? <p>{message}</p> : null}
							</div>
						</AccordionDetails>
					</Accordion>
					<Accordion style={{ width: '100%' }}>
						<AccordionSummary
							expandIcon={<ExpandMoreIcon />}
							aria-controls="panel1a-content"
							id="panel1a-header"
						>
							<h3>About Us</h3>
						</AccordionSummary>
						<AccordionDetails>
							<div className="sidebar-cards">
								<textarea
									placeholder="type..."
									value={update.about}
									onChange={(e) => setUpdate({ ...update, about: e.target.value })}
								/>
								<button onClick={updateAboutUs}>post</button>
								{loader ? <Spin /> : null}
								{message ? <p>{message}</p> : null}
							</div>
						</AccordionDetails>
					</Accordion>
					<Accordion style={{ width: '100%' }}>
						<AccordionSummary
							expandIcon={<ExpandMoreIcon />}
							aria-controls="panel1a-content"
							id="panel1a-header"
						>
							<h3>Slider</h3>
						</AccordionSummary>
						<AccordionDetails>
							<div className="sidebar-cards">
								<Dropzone onDrop={(acceptedFiles) => setUpdate({ ...update, slider: acceptedFiles })}>
									{({ getRootProps, getInputProps }) => (
										<section>
											<div {...getRootProps()}>
												<input {...getInputProps()} />
												<p>Drag 'n' drop some files here, or click to select gallery images</p>
											</div>
										</section>
									)}
								</Dropzone>
								{message === 'Images Uploaded' ? null : (
									<button onClick={uploadInfoGallery}>upload</button>
								)}
								<button onClick={updateInfoGallery}>post images</button>
								{loader ? <Spin /> : null}
								{message ? <p>{message}</p> : null}
							</div>
						</AccordionDetails>
					</Accordion>
				</div>
			</div>
		</div>
	);
};
export default Edit;
