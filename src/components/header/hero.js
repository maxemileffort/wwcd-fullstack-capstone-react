import React from 'react';
import { Link } from "react-router-dom";
  
export default function Header(){
    return (
        <header className="top">
        	<div className="banner">
        		<Link to="/">
        			<h1>Winner Winner</h1>
        			<h1>Chicken Dinner</h1>
        		</Link>	
        	</div>
        	<div className="tagline">
        		<p>Daily Fantasy Sports Stats</p>
        	</div>
        </header>)
    }