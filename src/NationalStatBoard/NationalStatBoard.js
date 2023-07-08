import React from 'react';
import './NationalStatBoard.css';


class NationalStatBoard extends React.Component {
	constructor(props) {
        super(props);
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
							<div className="count">29,754<div className="diff">( 97 )</div></div>
						</div>
						<div className="stat-item recovered">
							<div className="label">Эдгэрсэн <i className="fas fa-walking"></i></div>
							<div className="count">7,973<div className="diff">( 25 )</div></div>
						</div>
						<div className="stat-item dead">
							<div className="label">Нас барсан <i className="fas fa-book-dead"></i></div>
							<div className="count">143<div className="diff">( 1 )</div></div>
						</div>
						<div className="stat-item active">
							<div className="label">Идэвхтэй <i className="fas fa-procedures"></i></div>
							<div className="count">1460<div className="diff">( 49 ) ( {isLoaded ? items.criticalCumulative+" хурц" : "..."} )</div></div>
						</div>
						<div className="stat-item tested">
							<div className="label">Шинжилгээ хийсэн <i className="fas fa-vial"></i></div>
							<div className="count">55093<div className="diff">( 23 )</div></div>
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