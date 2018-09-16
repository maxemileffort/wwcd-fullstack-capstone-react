import React, { Fragment } from 'react';
import { Redirect } from "react-router-dom";

import Account from './account'
import Rundown from './rundown'

export default function Dashboard(props){
	console.log(props.props)
	// check to see if user, who is trying to go to dashboard,
	// 	is logged in. if not, redirect to login page
	if (props.props.loggedIn){
		return (
		<Fragment>
			<Rundown />
			<Account /> 
		</Fragment>)
	} else {
		return (<Redirect to="/user/login"/>)
	}
}