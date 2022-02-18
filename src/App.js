import { useState, useEffect } from 'react';
import axios from 'axios';
import './App.scss';

const nasaUrl = 'https://epic.gsfc.nasa.gov/api/natural/date/2022-02-14';

function App() {
	const [photoObjects, setPhotoObjects] = useState([]);

	useEffect(() => {
		// IIFE - https://developer.mozilla.org/en-US/docs/Glossary/IIFE
		(async () => {
			try {
				const response = await axios.get(nasaUrl);
				const data = response.data;
				const imageName = data['0'].image + '.jpg';
				const caption = data['0'].caption;

				setPhotoObjects([
					{
						imageName,
						caption
					}
				]);
			}
			catch (err) {
				console.error(err);
			}
		})();
	}, []);

	return (
		<div className="App">
			<h1>NASA Images</h1>
			<div className="photos">
				{photoObjects.map((obj, i) => {
					return (
						<div key={i}>
							<div>{obj.caption}
							</div>
							<img src={`https://epic.gsfc.nasa.gov/archive/natural/2022/02/14/jpg/${obj.imageName}`} alt="" />
						</div>
					)
				})}
			</div>
		</div>
	);
}

export default App;