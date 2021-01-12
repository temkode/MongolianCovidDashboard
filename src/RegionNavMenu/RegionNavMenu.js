import './RegionNavMenu.css';


function RegionNavMenu(props) {
    return (
        <div>
            <div className="region-nav">
                {props.regions.map(k => {
                    return (
                        <div className="region-btn" key={k.name} onClick={() => props.regionNavHandler(k.name)}>
                            {k.display_name}
                        </div>
                    )
                })}
            </div>
            <div className="region-nav-info">The regions not here have no recorded Covid cases</div>
        </div>
        
    )
}


export default RegionNavMenu;