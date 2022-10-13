import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Navbar from './Navbar';
import LandingPage from '../Layout/Landingpage';
import Booking from '../Layout/Book';
import Descriptions from '../Layout/Book/descriptions';
import Edit from '../Layout/Book/edit';
import Blog from '../Layout/Blog';
import Gallery from '../Layout/Gallery';
import AboutUs from '../Layout/About';
import Details from '../Layout/Blog/Details';

const index = () => {
	return (
		<BrowserRouter>
			<Navbar />
			<Routes>
				<Route path="/" element={<LandingPage />} />
				<Route path="/book-trip" element={<Booking />} />
				<Route path="/blog" element={<Blog />} />
				<Route path="/blog/details" element={<Details />} />
				<Route path="/gallery" element={<Gallery />} />
				<Route path="/aboutUs" element={<AboutUs />} />
				<Route path="admin" element={<Descriptions />} />
				<Route path="admin/edit" element={<Edit />} />
			</Routes>
		</BrowserRouter>
	);
};

export default index;
