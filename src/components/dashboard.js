import React, { Fragment } from 'react';
import { Redirect, Link } from "react-router-dom";

import Rundown from './rundown'

export default function Dashboard(props){
	console.log(props)
	// check to see if user, who is trying to go to dashboard,
	// 	is logged in. if not, redirect to login page
	if (props.appState.loggedIn){
		return (
		<Fragment>
			<Rundown />
			<Link to="/account">Account</Link>
		</Fragment>
		)
	} else {
		return (<Redirect to="/user/login"/>)
	}
}