import React from 'react'
import RegionNavMenu from '../RegionNavMenu/RegionNavMenu';
import './RegionalStatBoard.css'


class RegionalStatBoard extends React.Component {
	constructor(props) {
        super(props);
        this.state = {
		    error: null,
			isLoaded: false,
            items: [],
            region: props.match.params.region || "Ulaanbaatar"
        };
    }

    // TODO investigate componentWillUpdate() for better fit
    componentDidUpdate(prevPop) {   
        // Update state on region changing not just updating. Otherwise open render loop occurs
        if (this.props.match.params.region !== prevPop.match.params.region) {
            this.setState({
                region: this.props.match.params.region
            })
        }
    }

	componentDidMount() {
		fetch("https://ywv3go.deta.dev/regional")
			.then(res => res.json())
			.then(
				(result) => {
					this.setState({
						isLoaded: true,
						items: result.data
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

    async copyUrl() {
        const dummy = document.createElement('input');
        const text = window.location.href;

        document.body.appendChild(dummy);
        dummy.value = text;
        dummy.select();
        document.execCommand('copy');
        document.body.removeChild(dummy);

        const x = document.getElementById('url-tip');
        x.classList.remove('hidden');
        await new Promise(res => setTimeout(res, 1000));
        x.classList.add('hidden');
    }

    render () {
        const { error, isLoaded, items } = this.state;
        if (!error) {
            let region_data =  items.find(x => x.name === this.state.region);
            return  (
                <div className="region-wrapper">
                    <div className="share-btn-wrapper">
                        <div className="share-btn" onClick={this.copyUrl}>Share</div>
                        <span class="hidden tooltiptext" id="url-tip">URL copied!</span>
                    </div>
                    <div className="region-area">
                        <div className="region">
                            <div className="map">
                                <img src={`${process.env.PUBLIC_URL}/region-images/${isLoaded ? region_data.image_path : "ub.jpg"}`} alt="Map"/>
                            </div>
                            <div className="data-board">
                                <div className="title-wrapper">
                                    <div className="region-name">
                                        {isLoaded ? region_data.display_name : "..."}
                                    </div>
                                    <div className="stat">
                                        <div className="label">Active</div>
                                        <div className="count">{isLoaded ? region_data.active : "..."}</div>
                                    </div>
                                    <div>
                                        <div className="label">Deceased</div>
                                        <div className="count">{isLoaded ? region_data.deceased : "..."}</div>
                                    </div>
                                    <div className="stat">
                                        <div className="label">Confirmed</div>
                                        <div className="count">{isLoaded ? region_data.confirmed : "..."}<div className="diff">( {isLoaded ? region_data.newlyConfirmed : "..."} )</div></div>
                                    </div>
                                </div>
                                <div className="prefecture-area">
                                    {isLoaded ? region_data.prefectures.map(prefecture_data => {
                                        return (
                                            <div className="prefecture" key={prefecture_data.name}>
                                                <div className="name">
                                                    {prefecture_data.display_name}
                                                </div>
                                                <div className="label">
                                                    Active cases
                                                </div>
                                                <div className="count">
                                                    {prefecture_data.confirmed}
                                                    <div className="diff">
                                                        ( {prefecture_data.newlyConfirmed} )
                                                    </div>
                                                </div>
                                            </div>
                                        )
                                    }) : null}
                                </div>
                            </div>
                        </div>
                    </div>
                    <RegionNavMenu regions={isLoaded ? items : []}/>
                </div>
            )
        } else {
            return <h1>Error</h1>
        }        
    }
}


export default RegionalStatBoard