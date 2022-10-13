import React from 'react';
import Footer from '../../Navigation/Footer';
import Share from '../ModalUI/Share';
import { db } from '../config/firebase';
import { useNavigate } from 'react-router-dom';

import './Styles.css';
const Blog = () => {
	const navigate = useNavigate();

	React.useEffect(() => {
		getBlogs();
	}, []);

	const [ blogs, setBlogs ] = React.useState([]);

	const getBlogs = async () => {
		try {
			db.collection('blogs').onSnapshot((snapshot) => {
				const blog_info = [];
				snapshot.forEach((doc) => {
					const data = doc.data();
					blog_info.push({ id: doc.id, ...data });
				});
				setBlogs(blog_info);
			});
		} catch (err) {
			console.log(err);
		}
	};

	return (
		<div className="blog-container">
			<div className="blog-main">
				{!blogs ? (
					<h1>Travel with us for a memorable experience</h1>
				) : (
					blogs.map((b) => (
						<div className="blog-card" key={b.id}>
							<img src={b.featuredimageLink} alt="tour uganda" />
							<div className="blog-card-content">
								<h2 onClick={() => navigate('/blog/details', { state: b })}>{b.title}</h2>
								<p>{b.desc.substring(0, 200) + '...'}</p>
								<button onClick={() => navigate('/blog/details', { state: b })}>more..</button>
							</div>
						</div>
					))
				)}
			</div>
			<Share url="https://www.ihangatoursandtravels.com/blog" />
			<Footer />
		</div>
	);
};

export default Blog;
