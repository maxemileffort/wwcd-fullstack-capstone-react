import React, { Fragment } from 'react';
import { Link } from "react-router-dom";

export default function Signup(props){
  console.log(props)
  let email = React.createRef()
  let username = React.createRef()
  let password1 = React.createRef()
  let password2 = React.createRef()
    return(
      <Fragment>
        <section className="">
          <h3>Time to Join the Winning Team</h3>
          <form 
            action="#" 
            method="post" 
            id="create-user" 
            onSubmit={event=>{
              event.preventDefault();
              props.handleSignup(email, username, password1, password2)
            }}>
            <label htmlFor="create-username">Username:</label>
            <input ref={username} id="create-username" type="text" name="userame" placeholder="Username"/>
            <label htmlFor="create-email">Email:</label>
            <input ref={email} id="create-email" type="email" name="email" placeholder="Email" 
              onBlur={()=>{
                let inputEmail = email.current.value;
                props.checkEmailExists(inputEmail);
              }}/>
            <label htmlFor="create-password1">Password:</label>
            <input ref={password1} id="create-password1" type="password" name="password1"  placeholder="Password"/>
            <label htmlFor="create-password2">Retype Password:</label>
            <input ref={password2} id="create-password2" type="password" name="password2" placeholder="Retype Password"/>
            <input id="create-submit" type="submit" value="Sign up" className="btn"/>
          </form>
        
        </section>
        <section className="benefits">
          <p>What you get for joining:</p>
          <ul>
            <li>Free picks, every week!</li>
            <li>Analysis of last week's top performers -- Coming Soon!</li>
            <li>Which stats correlate most with high performance  -- Coming Soon!</li>
          </ul>
      </section>
      <Link to="/user/login">Already have an account? <span className="underline">Login</span></Link>
      </Fragment>
    )
}