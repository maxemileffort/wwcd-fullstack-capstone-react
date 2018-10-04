import React from 'react'
import { Link, Redirect } from "react-router-dom";

export default function Account(props){
    console.log(props)
    let accountCurrentEmail = React.createRef();
    let accountCurrentPassword = React.createRef();
    let accountNewEmail = React.createRef();
    let accountNewPassword1 = React.createRef();
    let accountNewPassword2 = React.createRef();
    let newsletter = React.createRef();
    if (!props.appState.loggedIn){
        return (
            <Redirect to="/user/login"/>
        )
    } else {
        return(
            <section>
                <h2>Account</h2>
                <label htmlFor="account-username">Username:</label>
                <p>{props.appState.user.username}</p>
                <form id="account-email-password-update" method="post" 
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
                    <legend htmlFor="account-email-password-update">Change password and/or email</legend>
                    <label htmlFor="account-current-email">Current Email:</label>
                    <input ref={accountCurrentEmail} type="text" id="account-current-email" placeholder="abc@abc.com"/>
                    <label htmlFor="account-new-email">New Email:</label>
                    <input ref={accountNewEmail} type="text" id="account-new-email" placeholder="jkl@jkl.com"
                        onBlur={()=>{
                            console.log(accountNewEmail)
                            props.checkEmailExists(accountNewEmail.current.value)
                        }}/>
                    <label htmlFor="account-current-password">Current Password:</label>
                    <input ref={accountCurrentPassword} type="password" id="account-current-password" placeholder="123"/>
                    <label htmlFor="account-new-password1">New Password:</label>
                    <input ref={accountNewPassword1} type="password" id="account-new-password1" placeholder="456"/>
                    <label htmlFor="account-new-password2">Confirm New Password:</label>
                    <input ref={accountNewPassword2} type="password" id="account-new-password2" placeholder="456"/>
                    <p>
                        <input ref={newsletter} type="checkbox" id="account-news-opt-in" defaultChecked="true"/>
                        <span htmlFor="account-news-opt-in"> Opt in for newsletter</span>
                    </p>
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
}