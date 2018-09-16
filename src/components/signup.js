import React from 'react';
import { BrowserRouter as Router,
  Route, 
  Link, 
  Redirect,
  withRouter 
} from "react-router-dom";

export default function Signup(props){
  let email = React.createRef()
  let username = React.createRef()
  let password1 = React.createRef()
  let password2 = React.createRef()
    return(
      <main className="main--unflex">
        <section className="">
          <h3>Time to Join the Winning Team</h3>
          <form 
            action="#" 
            method="post" 
            id="create-user" 
            onSubmit={event=>{
              event.preventDefault();
              props.props.handleSignup(email, username, password1, password2)
            }}>
            <input ref={username} id="create-username" type="text" name="userame" placeholder="Username"/>
            <input ref={email} id="create-email" type="email" name="email" placeholder="Email"/>
            <input ref={password1} id="create-password1" type="password" name="password1"  placeholder="Password"/>
            <input ref={password2} id="create-password2" type="password" name="password2" placeholder="Retype Password"/>
            <input id="create-submit" type="submit" value="Sign up" className="btn"/>
          </form>
        
        </section>
        <section className="benefits">
          <p>What you get for joining:</p>
          <ul>
            <li>Free picks, every week!</li>
            <li>Analysis of last week's top performers</li>
            <li>Which stats correlate most with high performance</li>
          </ul>
      </section>
      <Link to="/user/login">Already have an account? <span className="underline">Login</span></Link>
      </main>
    )
}