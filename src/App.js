import './App.css';
import { useState, useEffect } from 'react';
import Header from './Header/Header'
import NationalStatBoard from "./NationalStatBoard/NationalStatBoard";

function App() {
	const [error, setError] = useState(null);
	const [isLoaded, setIsLoaded] = useState(false);
	const [items, setItems] = useState(
		{
			'daily': [],
			'prefectures': [],
			'regions': [],
			'updated': ""
		}
	);

	useEffect(() => {
		fetch("https://covid19mn.web.app/summary/latest.json")
			.then(res => res.json())
			.then(
				(result) => {
				setItems(result);   // Changing the order of these two breaks this
				setIsLoaded(true);
				},
				(error) => {
				setIsLoaded(true);
				setError(error);
				}
			)
	}, [])

	let data;
	if (error) {
		data = {
			"confirmed": ["Error", "NaN"],
			"recovered": ["Error", "NaN"],
			"dead": ["Error", "NaN"],
			"active": ["Error", "NaN"],
			"tested": ["Error", "NaN"],
		}
	} else if (!isLoaded) {
		data = {
			"confirmed": ["...", "..."],
			"recovered": ["...", "..."],
			"dead": ["...", "..."],
			"active": ["...", "..."],
			"tested": ["...", "..."],
		}
	} else {
		let stats = items.daily[items.daily.length - 1]
		data = { 
			"confirmed": [new Intl.NumberFormat().format(stats["confirmedCumulative"]), new Intl.NumberFormat().format(stats["confirmed"])],
			"recovered": [new Intl.NumberFormat().format(stats["recoveredCumulative"]), new Intl.NumberFormat().format(stats["recovered"])],
			"dead": [new Intl.NumberFormat().format(stats["reportedDeceasedCumulative"]), new Intl.NumberFormat().format(stats["reportedDeceased"])],
			"active": [new Intl.NumberFormat().format(stats["activeCumulative"]), new Intl.NumberFormat().format(stats["active"]), stats["criticalCumulative"]],
			"tested": [new Intl.NumberFormat().format(stats["testedCumulative"]), new Intl.NumberFormat().format(stats["tested"])],
		}
	}

	return (
		<div className="App">
			<Header />
			<NationalStatBoard data={data}/>
		
		</div>
	);
}

export default App;
