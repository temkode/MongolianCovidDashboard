import './Header.css';

function Header() {
    return (
      	<header>
			<div className="header-logo">
				Covid <div className="mobile-space">Самбар</div>
			</div>
        
			<div className="header-updated">
			Сүүлд шинэчлэгдсэн:&nbsp;<div className="mobile-space updated">{"2 жилийн өмнө"}</div>
			</div>
      	</header>
    )
}

export default Header