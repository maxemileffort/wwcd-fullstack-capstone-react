import React from 'react'

export default function Account(props){
    console.log(props)
    let accountCurrentEmail = React.createRef();
    let accountCurrentPassword = React.createRef();
    let accountNewEmail = React.createRef();
    let accountNewPassword1 = React.createRef();
    let accountNewPassword2 = React.createRef();
    return(
        <section>
            <h2>Account</h2>
            <label htmlFor="account-username">Username:</label>
            <p>{props.appState.user.username || "Error detecting username."}</p>
			<input type="checkbox" id="account-news-opt-in"/>
            <label htmlFor="account-news-opt-in"> Opt in for newsletter</label>
            <br />
            <label htmlFor="account-email-password-change">Change password and or email</label>
            <form id="account-email-password-change" method="post" 
            	onSubmit={event=>{
                    event.preventDefault();
                    let updateObj = {
                        accountCurrentEmail, 
                        accountNewEmail, 
                        accountCurrentPassword, 
                        accountNewPassword1, 
                        accountNewPassword2
                    };
                    props.handleAccountUpdate(updateObj)
                }}>
            	<input ref={accountCurrentEmail} type="text" id="account-current-email" placeholder="Current Email"/>
                <input ref={accountNewEmail} type="text" id="account-new-email" placeholder="New Email"
                	onBlur={()=>{
                        console.log(accountNewEmail)
                        props.checkEmailExists(accountNewEmail.current.value)
                    }}/>
            	<input ref={accountCurrentPassword} type="password" id="account-current-password" placeholder="Current Password"/>
            	<input ref={accountNewPassword1} type="password" id="account-new-password1" placeholder="New Password"/>
            	<input ref={accountNewPassword2} type="password" id="account-new-password2" placeholder="Confirm Password Change"/>
                <input type="submit" id="account-update-submit" value="Update Account" />
            </form>
		</section>
    )
}



