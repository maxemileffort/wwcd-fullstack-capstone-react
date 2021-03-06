import React, { Fragment } from 'react';
import { Link, Redirect } from "react-router-dom";

export default function Login(props){
  console.log(props)
  let email = React.createRef()
  let password = React.createRef()
    return (
      <section>
        {props.appState.loggedIn ? (
          <Fragment>
            <Redirect to="/dashboard"/>
          </Fragment>
        ):
        (
          <Fragment>
            <h3>Welcome Back</h3>
            <form 
              action="" 
              method="POST" 
              onSubmit={(event)=>{
                event.preventDefault();
                console.log(email)
                console.log(password)
                props.handleLogin(email.current.value, password.current.value);
            }}>
              <label htmlFor="login-email">Email:</label>
              <input ref={email} id="login-email" type="email" name="email" placeholder="Email" defaultValue="abc@abc.com"/>
              <label htmlFor="login-password">Password:</label>
              <input ref={password} id="login-password" type="password" name="password"  placeholder="Password" defaultValue="123"/>
              <input id="login-submit" type="submit" value="Login" className="btn" />
            </form>
            <Link to="/user/create">Don't have an account yet? <span className="underline">Signup</span></Link>
          </Fragment>
        )}
      </section>
    )
} 