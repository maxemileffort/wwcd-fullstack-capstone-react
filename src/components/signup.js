import React from 'react';
import { BrowserRouter as Router,
  Route, 
  Link, 
  Redirect,
  withRouter 
} from "react-router-dom";

export default function Signup(){
    return(
        <main className="main--unflex">
      <section className="">
        <h3>Time to Join the Winning Team</h3>
        <form action="#" method="post" id="create-user">
          <input id="create-username" type="text" name="userame" placeholder="Username"/>
          <input id="create-email" type="email" name="email" placeholder="Email"/>
          <input id="create-password1" type="password" name="password1"  placeholder="Password"/>
          <input id="create-password2" type="password" name="password2" placeholder="Retype Password"/>
          <input id="create-submit" type="submit" value="Sign up" className="btn"/>
          <div style={{color: "red"}} id="create-user-error"></div>
        </form>
        
      </section>
      <section className="benefits">
        <p>What you get for joining:</p>
        <ul>
          <li>Free picks, every week!</li>
          <li>Analysis of last week's top performers</li>
          <li>Which stats correlate most with high performance</li>
          <li>Pro members get unlimited numbers of lineups to compare!</li>
        </ul>
      </section>
      <Link to="/login">Already have an account? <span className="underline">Login</span></Link>
      </main>
    )
}