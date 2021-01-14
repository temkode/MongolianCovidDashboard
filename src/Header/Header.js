import { useState, useEffect } from 'react';
import './Header.css';


function Header() {
	const [error, setError] = useState(null);
	const [item, setItem] = useState('');

	useEffect(() => {
		fetch("https://ywv3go.deta.dev/updated")
			.then(res => res.json())
			.then(
				(result) => {
					setItem(result.updated);
				},
				(error) => {
					setError(error);
				}
			)
	}, [])

    return (
      	<header>
			<div className="header-logo">
				Covid <div className="mobile-space">Самбар</div>
			</div>
        
			<div className="header-updated">
				Last updated:&nbsp;<div className="mobile-space">{error || timeSince(item)}</div>
			</div>
      	</header>
    )
}

function timeSince(date) {
	if (date === "") {
		return "...";
	}
    const seconds = Math.floor((new Date() - Date.parse(date)) / 1000);
    let interval = seconds / 31536000;
  
    if (interval > 1) {
      return Math.floor(interval) + " years ago";
    }
    interval = seconds / 2592000;
    if (interval > 1) {
      return Math.floor(interval) + " months ago";
    }
    interval = seconds / 86400;
    if (interval > 1) {
      return Math.floor(interval) + " days ago";
    }
    interval = seconds / 3600;
    if (interval > 1) {
      return Math.floor(interval) + " hours ago";
    }
    interval = seconds / 60;
    if (interval > 1) {
      return Math.floor(interval) + " minutes ago";
    }
    return Math.floor(seconds) + " seconds ago";
}


export default Header