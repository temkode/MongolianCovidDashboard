import React from 'react'
import './NationalStatBoard.css'


class NationalStatBoard extends React.Component {
    constructor(props) {
		super(props);
		this.state = {
			error: null,
			isLoaded: false,
			items: []
		};
	}

	componentDidMount() {
		fetch("https://covid19mn.web.app/summary/latest.json")
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
			<div className="wrapper-stat-list">
				<div className="stat-list">
					<div className="stat-item confirmed">
						<div className="count">{data["confirmed"][0]}<div className="diff">( +{data["confirmed"][1]} )</div></div>
						<div className="label">Confirmed</div>
					</div>
					<div className="stat-item recovered">
						<div className="count">{data["recovered"][0]}<div className="diff">( +{data["recovered"][1]} )</div></div>
						<div className="label">Recovered</div>
					</div>
					<div className="stat-item dead">
						<div className="count">{data["dead"][0]}<div className="diff">( +{data["dead"][1]} )</div></div>
						<div className="label">Deceased</div>
					</div>
					<div className="stat-item active">
						<div className="count">{data["active"][0]}<div className="diff">( +{data["active"][1]} )</div></div>
						<div className="label">Active<div className="crit">({data["active"][2]} critical)</div></div>
					</div>
					<div className="stat-item tested">
						<div className="count">{data["tested"][0]}<div className="diff">( +{data["tested"][1]} )</div></div>
						<div className="label">Tested</div>
					</div>
				</div>
			</div>
		)
  	}
}


export default NationalStatBoard