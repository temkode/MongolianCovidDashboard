import './App.css';
import { useState, useEffect } from 'react';
import Header from './Header/Header'
import NationalStatBoard from "./NationalStatBoard/NationalStatBoard";
import RegionalStatBoard from "./RegionalStatBoard/RegionalStatBoard";


function App() {
	const [error, setError] = useState(null);
	const [isLoaded, setIsLoaded] = useState(false);
	const [items, setItems] = useState();

	useEffect(() => {
		fetch("https://ywv3go.deta.dev/latest")
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

	let national_data;
	let regional_data;
	if (error) {
		national_data = {
			"confirmed": ["Error", "..."],
			"recovered": ["Error", "..."],
			"dead": ["Error", "..."],
			"active": ["Error", "..."],
			"tested": ["Error", "..."],
		}
		regional_data = null
	} else if (!isLoaded) {
		national_data = {
			"confirmed": ["...", "..."],
			"recovered": ["...", "..."],
			"dead": ["...", "..."],
			"active": ["...", "..."],
			"tested": ["...", "..."],
		}
		regional_data = {
			regions: [],
			prefectures: []
		};
	} else {
		let stats = items.daily[items.daily.length - 1]
		national_data = { 
			"confirmed": [fmtNumber(stats["confirmedCumulative"]), fmtNumber(stats["confirmed"], true)],
			"recovered": [fmtNumber(stats["recoveredCumulative"]), fmtNumber(stats["recovered"], true)],
			"dead": [fmtNumber(stats["reportedDeceasedCumulative"]), fmtNumber(stats["reportedDeceased"], true)],
			"tested": [fmtNumber(stats["testedCumulative"]), fmtNumber(stats["tested"], true)],
			"active": [
				fmtNumber(stats["activeCumulative"]), 
				fmtNumber(stats["active"], true), 
				stats["criticalCumulative"]
			],
		}
		regional_data = {
			regions: items.regions,
			prefectures: items.prefectures
		};
	}

	return (
		<div className="App">
			<Header />
			<NationalStatBoard data={national_data}/>
			<RegionalStatBoard data={regional_data}/>
		
		</div>
	);
}

function fmtNumber(number, signAdd=false) {
	let rv = '';
	if (signAdd) {
		rv += (number < 0) ? '-' : '+'
	}
	rv += new Intl.NumberFormat().format(number)
	
	return rv
}


export default App;
