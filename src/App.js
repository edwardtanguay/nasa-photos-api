import { useState, useEffect } from 'react';
import axios from 'axios';
import './App.scss';

// const startDate = '2022-01-10';

// const nasaUrl = 'https://epic.gsfc.nasa.gov/api/natural/date/2022-01-10';
// const nasaUrl = 'https://epic.gsfc.nasa.gov/api/natural/date/2022-02-11';
// const nasaUrl = 'https://epic.gsfc.nasa.gov/api/natural/date/2022-02-12';

function App() {
	const [photoObjects, setPhotoObjects] = useState([]);

	const getApiData = async (date1) => {
		try {
			const url = `https://epic.gsfc.nasa.gov/api/natural/date/${date1}`;
			const response = await axios.get(url);
			const data = response.data;
			const day = date1.substring(8, 11);
			const imageUrlName = `https://epic.gsfc.nasa.gov/archive/natural/2022/01/${day}/jpg/${data['0'].image}.jpg`;
			const caption = data['0'].caption;
			const date = data['0'].date;
			return {
				imageUrlName,
				caption,
				date
			};
		}
		catch (err) {
			console.error(err);
		}
	}

	useEffect(() => {
		// IIFE - https://developer.mozilla.org/en-US/docs/Glossary/IIFE
		(async () => {
			const _photoObjects = [];
			for (let i = 10; i <= 15; i++) {
				const date = `2022-01-${i}`;
				const photoObj = await getApiData(date);
				_photoObjects.push(photoObj);
			}
			setPhotoObjects(_photoObjects);
		})();
	}, []);

	return (
		<div className="App">
			<h1>NASA Images</h1>
			{photoObjects.map((obj, i) => {
				return (
					<div className="photos">
						<div key={i}>
							<div>{obj.caption} - {obj.date} </div>
							<img src={obj.imageUrlName} alt="" />
						</div>
					</div>
				)
			})}
		</div>
	);
}

export default App;