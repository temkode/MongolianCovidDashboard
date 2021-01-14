import './RegionNavMenu.css';
import {Link} from "react-router-dom";


function RegionNavMenu(props) {
    return (
        <div>
            <div className="region-nav">
                {props.regions.map(k => {
                    return (
                        <Link to={`/${k.name}`} className="region-btn" key={k.name}>
                            {k.display_name}
                        </Link>
                    )
                })}
            </div>
            <div className="region-nav-info">Энд байхгүй бүс нутагт Ковидын тохиолдол бүртгэгдээгүй байна.</div>
        </div>
        
    )
}


export default RegionNavMenu;