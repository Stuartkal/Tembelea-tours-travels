import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Navbar from './Navbar';
import LandingPage from '../Layout/Landingpage';
import Booking from '../Layout/Book';
import Descriptions from '../Layout/Book/descriptions';
import Edit from '../Layout/Book/edit';

const index = () => {
	return (
		<BrowserRouter>
			<Navbar />
			<Routes>
				<Route path="/" element={<LandingPage />} />
				<Route path="/book-trip" element={<Booking />} />
				<Route path="admin" element={<Descriptions />} />
				<Route path="admin/edit" element={<Edit />} />
			</Routes>
		</BrowserRouter>
	);
};

export default index;
