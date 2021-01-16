import React from 'react';
import './NationalStatBoard.css';


class NationalStatBoard extends React.Component {
	constructor(props) {
        super(props);
        this.state = {
			error: null,
			isLoaded: false,
			items: {}
		};
	}

	componentDidMount() {
		fetch("https://ywv3go.deta.dev/national")
			.then(res => res.json())
			.then(
				(result) => {
					this.setState({
						isLoaded: true,
						items: result
					});
				},

				(error) => {
					this.setState({
						isLoaded: true,
						error
					});
				}
			)
	}

	render() {
		const { error, isLoaded, items } = this.state;
		if (!error) {
			return (
				<div className="wrapper-stat-list">
					<div className="national-stat-title">Монгол улсад нийт:</div>
					<div className="stat-list">
						<div className="stat-item confirmed">
							<div className="label">Батлагдсан <i className="fas fa-viruses"></i></div>
							<div className="count">{isLoaded ? items.confirmedCumulative : "..."}<div className="diff">( {isLoaded ? items.confirmed : "..."} )</div></div>
						</div>
						<div className="stat-item recovered">
							<div className="label">Эдгэрсэн <i className="fas fa-walking"></i></div>
							<div className="count">{isLoaded ? items.recoveredCumulative : "..."}<div className="diff">( {isLoaded ? items.recovered : "..."} )</div></div>
						</div>
						<div className="stat-item dead">
							<div className="label">Нас барсан <i className="fas fa-book-dead"></i></div>
							<div className="count">{isLoaded ? items.deceasedCumulative : "..."}<div className="diff">( {isLoaded ? items.deceased : "..."} )</div></div>
						</div>
						<div className="stat-item active">
							<div className="label">Идэвхтэй <i className="fas fa-procedures"></i></div>
							<div className="count">{isLoaded ? items.activeCumulative : "..."}<div className="diff">( {isLoaded ? items.active : "..."} ) ( {isLoaded ? items.criticalCumulative+" хурц" : "..."} )</div></div>
						</div>
						<div className="stat-item tested">
							<div className="label">Шинжилгээ хийсэн <i className="fas fa-vial"></i></div>
							<div className="count">{isLoaded ? items.testedCumulative : "..."}<div className="diff">( {isLoaded ? items.tested : "..."} )</div></div>
						</div>
					</div>
				</div>
			)
		} else {
			return <h1>Error</h1>  // TODO properly handle
		}
	}
}


export default NationalStatBoard