import React from 'react';
import { EditorState, convertToRaw } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import draftToHtml from 'draftjs-to-html';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import axios from 'axios';
import { db } from '../config/firebase';
import logo from '../../../assets/images/logo1.png';
import { Image } from 'antd';
import Dropzone from 'react-dropzone';
import { Spin } from 'antd';

import './Styles.css';
const Descriptions = () => {
	const [ state, setState ] = React.useState({
		editorState: EditorState.createEmpty(),
		trip: '',
		days: '',
		location: '',
		featuredimageLink: ''
	});

	const [ image, setImage ] = React.useState('');
	const [ images, setImages ] = React.useState([]);
	const [ gallery, setGallery ] = React.useState([]);
	const [ preview, setPreview ] = React.useState('');
	const [ upload, setUpload ] = React.useState('');
	const [ galleryUpload, setGalleryUpload ] = React.useState(false);
	const [ error, setError ] = React.useState('');
	const [ message, setMessage ] = React.useState('');

	const handleChange = (e) => {
		setImage(e.target.files[0]);
		setPreview(URL.createObjectURL(e.target.files[0]));
	};

	const onEditorStateChange = (e) => {
		setState({ ...state, editorState: e });
	};

	// console.log(gallery, 'kk');

	const uploadFiles = () => {
		setError('');
		document.getElementById('selectFile').click();
	};

	const uploadGallery = () => {
		if (images.length === 0) return setMessage('No images selected');
		setGalleryUpload(true);
		let docs = [];
		const data = new FormData();
		images.forEach((file) => {
			data.append('file', file);
			data.append('upload_preset', 'starthub_preset');
			axios
				.post('https://api.cloudinary.com/v1_1/starthub-africa/upload', data)
				.then((res) => {
					// console.log(res.data);
					docs.push(res.data.secure_url);
					setGallery(docs);
					setMessage('Images Uploaded, Thank you!');
					setGalleryUpload(false);
				})
				.catch((err) => {
					console.log(err);
				});
		});
	};

	const addTrip = async () => {
		if (!image || !state.trip || !state.location || !state.editorState) return setError('All fields are required');
		setUpload('uploading...');
		const data = new FormData();
		data.append('file', image);
		data.append('upload_preset', 'starthub_preset');
		await axios
			.post('https://api.cloudinary.com/v1_1/starthub-africa/upload', data)
			.then((res) => {
				setState({ ...state, featuredimageLink: res.data.url });
				setUpload('Featured Image Uploaded');
				setPreview('');
				db
					.collection('trips')
					.add({
						trip: state.trip,
						days: state.days,
						location: state.location,
						featuredimageLink: res.data.url,
						public_id: res.data.public_id,
						gallery: gallery,
						description: draftToHtml(convertToRaw(state.editorState.getCurrentContent()))
					})
					.then((res) => {
						// console.log(res);
						setUpload('Published, Thank you!');
						setImage('');
						setState({
							editorState: EditorState.createEmpty(),
							trip: '',
							days: '',
							location: '',
							featuredimageLink: ''
						});
					})
					.catch((err) => {
						console.log(err);
					});
			})
			.catch((error) => {
				setUpload('Trouble Uploading Image, Try again');
				console.log(error);
			});
	};

	return (
		<div className="description-main">
			<div className="description-container">
				<img src={logo} alt="visit uganda" style={{ height: '150px', width: '300px' }} />
				{error ? <h2>{error}</h2> : <h2>Tour Experience</h2>}
				<button disabled={upload ? true : false} onClick={addTrip}>
					{upload ? upload : 'Publish Experience'}
				</button>
				<div className="form-row">
					<input
						value={state.trip}
						onChange={(e) => setState({ ...state, trip: e.target.value })}
						placeholder="Trip"
					/>
					<input
						type="number"
						value={state.days}
						onChange={(e) => setState({ ...state, days: e.target.value })}
						placeholder="Days"
						min={0}
					/>
					<input
						value={state.location}
						onChange={(e) => setState({ ...state, location: e.target.value })}
						placeholder="Location"
					/>
					<input
						id="selectFile"
						onChange={handleChange}
						type="file"
						style={{ border: 'none', display: 'none' }}
					/>
					<div className="upload-file" onClick={uploadFiles.bind()}>
						<p>+</p>
						<p>Add featured image</p>
					</div>
				</div>
				{preview ? <Image style={{ height: '100px' }} className="preview" src={preview} /> : null}
				<div className="form-row">
					<Dropzone onDrop={(acceptedFiles) => setImages(acceptedFiles)}>
						{({ getRootProps, getInputProps }) => (
							<section>
								<div {...getRootProps()}>
									<input {...getInputProps()} />
									<p>Drag 'n' drop some files here, or click to select gallery images</p>
								</div>
							</section>
						)}
					</Dropzone>
					<p>{galleryUpload ? <Spin /> : message}</p>
					<button disabled={message ? true : false} onClick={uploadGallery}>
						{galleryUpload ? <Spin /> : 'upload gallery'}
					</button>
				</div>
				<Editor
					editorState={state.editorState}
					wrapperClassName="demo-wrapper"
					editorClassName="demo-editor"
					onEditorStateChange={onEditorStateChange}
					placeholder="Type description here..."
				/>
			</div>
		</div>
	);
};
export default Descriptions;
