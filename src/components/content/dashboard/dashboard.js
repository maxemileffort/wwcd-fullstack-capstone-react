import React, { Fragment } from 'react';
import { Redirect, Link } from "react-router-dom";

import Rundown from './rundown'

export default function Dashboard(props){
	console.log(props)
	// check to see if user, who is trying to go to dashboard,
	// 	is logged in. if not, redirect to login page
	if (props.appState.loggedIn){
		return (
		<div className="dashboard__format">
			<div className="row">
				<h2>Dashboard</h2>
				<Link to="/account" className="link-no-box no-hover-effect" style={{margin: 'auto 10px'}}>Account</Link>	
			</div>
			<Rundown />
		</div >
		)
	} else {
		return (<Redirect to="/user/login"/>)
	}
}