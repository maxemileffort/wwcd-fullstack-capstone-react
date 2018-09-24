import React from 'react'
import { Link } from "react-router-dom";

export default function Account(props){
    console.log(props)
    let accountCurrentEmail = React.createRef();
    let accountCurrentPassword = React.createRef();
    let accountNewEmail = React.createRef();
    let accountNewPassword1 = React.createRef();
    let accountNewPassword2 = React.createRef();
    let newsletter = React.createRef();
    return(
        <section>
            <h2>Account</h2>
            <label htmlFor="account-username">Username:</label>
            <p>{props.appState.user.username || "Error detecting username."}</p>
            <p>
                <input ref={newsletter} type="checkbox" id="account-news-opt-in" defaultChecked="true"/>
                <label htmlFor="account-news-opt-in"> Opt in for newsletter</label>
            </p>
            <p>
                <label htmlFor="account-email-password-change">Change password and or email</label>
            </p>
            <form id="account-email-password-change" method="post" 
            	onSubmit={event=>{
                    event.preventDefault();
                    let updateObj = {
                        accountCurrentEmail: accountCurrentEmail.current.value, 
                        accountNewEmail: accountNewEmail.current.value, 
                        accountCurrentPassword: accountCurrentPassword.current.value, 
                        accountNewPassword1: accountNewPassword1.current.value, 
                        accountNewPassword2: accountNewPassword2.current.value,
                        accountType: props.appState.user.accountType,
                        newsletter: newsletter.current.checked
                    };
                    props.handleAccountUpdate(updateObj)
                }}>
            	<input ref={accountCurrentEmail} type="text" id="account-current-email" placeholder="Current Email" defaultValue="abc@abc.com"/>
                <input ref={accountNewEmail} type="text" id="account-new-email" placeholder="New Email" defaultValue="jkl@jkl.com"
                	onBlur={()=>{
                        console.log(accountNewEmail)
                        props.checkEmailExists(accountNewEmail.current.value)
                    }}/>
            	<input ref={accountCurrentPassword} type="password" id="account-current-password" placeholder="Current Password" defaultValue="123"/>
            	<input ref={accountNewPassword1} type="password" id="account-new-password1" placeholder="New Password" defaultValue="456"/>
            	<input ref={accountNewPassword2} type="password" id="account-new-password2" placeholder="Confirm Password Change" defaultValue="456"/>
                <div>
                    <a href='#' className="link-no-box no-hover-effect" 
                        onClick={event=>{
                            props.handleAccountDelete();
                        }
                    }>Delete Account</a>
                    <input type="submit" id="account-update-submit" className="btn" value="Update Account" />
                </div>
            </form>
            <Link to="/dashboard" style={{marginTop: '15px'}}>Dashboard</Link>
		</section>
    )
}



