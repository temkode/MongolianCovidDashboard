import React from 'react'
import * as REGIONS from './regions' 
import './RegionalStatBoard.css'


class RegionalStatBoard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            region: REGIONS.METADATA.Ulaanbaatar
        };
    }

    render () {
        let region_data =  this.props.data.regions.find(x => x.name === this.state.region.api_name);
        return  (
            <div className="region-wrapper">
                <div className="region-area">
                    <div className="region">
                        <div className="map">
                            <img src={`${process.env.PUBLIC_URL}/region-images/${this.state.region.image_path}`} alt="Map"/>
                        </div>
                        <div className="data-board">
                            <div className="title-wrapper">
                                <div className="region-name">
                                    {this.state.region.display_name}
                                </div>
                                <div className="stat">
                                    <div className="label">Active</div>
                                    <div className="count">{region_data ? region_data.active : "..."}</div>
                                </div>
                                <div>
                                    <div className="label">Deceased</div>
                                    <div className="count">{region_data ? region_data.deceased : "..."}</div>
                                </div>
                                <div className="stat">
                                    <div className="label">Confirmed</div>
                                    <div className="count">{region_data ? region_data.confirmed : "..."}<div className="diff">( +{region_data ? region_data.newlyConfirmed : "..."} )</div></div>
                                </div>
                            </div>
                            <div className="prefecture-area">
                                {this.state.region.prefectures.map(value => {
                                    let prefecture_data = this.props.data.prefectures.find(x => x.name === value.api_name);
                                    return (
                                        <div className="prefecture">
                                            <div className="name">
                                                {value.display_name}
                                            </div>
                                            <div className="label">
                                                Active cases
                                            </div>
                                            <div className="count">
                                                {prefecture_data.confirmed}<div className="diff">( +{prefecture_data.newlyConfirmed} )</div>
                                            </div>
                                        </div>
                                    )
                                })}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}


export default RegionalStatBoard