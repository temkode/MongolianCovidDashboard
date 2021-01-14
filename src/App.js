import './App.css';
import Header from './Header/Header';
import NationalStatBoard from "./NationalStatBoard/NationalStatBoard";
import RegionalStatBoard from "./RegionalStatBoard/RegionalStatBoard";
import {
    BrowserRouter as Router,
    Switch,
    Route
} from "react-router-dom";


function App() {
	return (
		<div className="App">
			<Header />
			<NationalStatBoard/>
			<Router>
				<Switch>
					<Route path={`/:region*`} component={RegionalStatBoard} />
				</Switch>
			</Router>
			
		</div>
	);
}


export default App;
