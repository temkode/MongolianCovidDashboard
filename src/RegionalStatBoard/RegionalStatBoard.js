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
        <div className="region-wrapper">
            <div className="share-btn-wrapper">
                <div className="share-btn" onClick={this.copyUrl}>Хуваалцах&nbsp;<i className="fas fa-share-square"></i></div>
                <span className="hidden tooltiptext" id="url-tip">URL хуулагдлаа!</span>
                <div className="national-stat-title">Бүс нутагуудад:</div>
            </div>
            <div className="region-area">
                <div className="region">
                    <div className="map">
                        <img src={`${process.env.PUBLIC_URL}/region-images/ub.jpg`} alt="Газрын зураг"/>
                    </div>
                    <div className="data-board">
                        <div className="title-wrapper">
                            <div className="region-name">Улаанбаатар</div>
                            <div className="stats">
                                <div className="stat">
                                    <div className="label">Идэвхтэй</div>
                                    <div className="count">0</div>
                                </div>
                                <div>
                                    <div className="label">Нас барсан</div>
                                    <div className="count">0</div>
                                </div>
                                <div className="stat">
                                    <div className="label">Батлагдсан</div>
                                    <div className="count">0<div className="diff">( 0 )</div></div>
                                </div>
                            </div>
                        </div>
                        <div className="prefecture-area">
                            <div className={`prefecture green`} key='2'>
                                <div className="name">
                                    Улаанбаатар
                                    {up_trend_icon}
                                </div>
                                <div className="label">
                                    Идэвхтэй тохиолдлууд
                                </div>
                                <div className="count">
                                    {0}
                                    <div className="diff">
                                        ( 0 )
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <RegionNavMenu regions={[]}/>
        </div>
    }
}


export default RegionalStatBoard