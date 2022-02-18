import { useState, useEffect } from 'react';
import axios from 'axios';
import './App.scss';

function App() {
	const [photos, setPhotos] = useState([]);
	return (
		<div className="App">
			<h1>NASA Images</h1>
		</div>
	);
}

export default App;