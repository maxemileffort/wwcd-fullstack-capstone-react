import React from 'react';
import { BrowserRouter as Router,
  Route, 
  Link, 
  Redirect,
  withRouter 
} from "react-router-dom";

export default function Login(){
    return (
        <section className="" id="login-user">
        <h3>Welcome Back</h3>
        <form action="" method="POST">
          <input id="login-email" type="email" name="email" placeholder="Email" />
          <input id="login-password" type="password" name="password"  placeholder="Password" />
          <input id="login-submit" type="submit" value="Login" className="btn" />
          <div style={{color: 'red'}} id="login-user-error"></div>
        </form>
        <Link to="/signup">Don't have an account yet? <span className="underline">Signup</span></Link>
      </section>
    )
}