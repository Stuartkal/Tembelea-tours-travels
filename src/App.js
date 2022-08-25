import React from 'react';
import Navigation from './components/Navigation';

function App() {
	React.useEffect(() => {
		document.title = 'Ihanga Tours and Travel';
	}, []);
	return (
		<div>
			<Navigation />
		</div>
	);
}

export default App;
