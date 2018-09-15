import React from 'react'
import { BrowserRouter as Router,
	Route, 
	Link, 
	Redirect,
	withRouter 
} from "react-router-dom";

export default function Account(props){
    console.log(props)
    return(
        <div>
            <p>Account stuff goes here.</p>
            <p>Opt in for newsletter</p>
            <p>Change password and or email</p>
		</div>
    )
}



