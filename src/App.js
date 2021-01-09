import './App.css';
import { useState, useEffect } from 'react';
import Header from './Header/Header'
import NationalStatBoard from "./NationalStatBoard/NationalStatBoard";


function App() {
	const [error, setError] = useState(null);
	const [isLoaded, setIsLoaded] = useState(false);
	const [items, setItems] = useState();

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
			"confirmed": ["Error", "..."],
			"recovered": ["Error", "..."],
			"dead": ["Error", "..."],
			"active": ["Error", "..."],
			"tested": ["Error", "..."],
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
	}

	return (
		<div className="App">
			<Header />
			<NationalStatBoard data={data}/>
		
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
