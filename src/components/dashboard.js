import React from 'react';


import Account from './account'
import Rundown from './rundown'

export default function Dashboard(props){
	console.log(props)
	return (
		<span>
			<Rundown />
			<Account />
		</span>
		)}