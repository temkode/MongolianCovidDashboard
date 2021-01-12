import './App.css';
import Header from './Header/Header';
import NationalStatBoard from "./NationalStatBoard/NationalStatBoard";
import RegionalStatBoard from "./RegionalStatBoard/RegionalStatBoard";


function App() {
	return (
		<div className="App">
			<Header />
			<NationalStatBoard/>
			<RegionalStatBoard/>
		</div>
	);
}


export default App;
