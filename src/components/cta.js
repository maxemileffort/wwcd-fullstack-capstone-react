import React from 'react'
import { BrowserRouter as Router,
    Route, 
    Link, 
    Redirect,
    withRouter 
  } from "react-router-dom";
  
export default function Cta(){
    return(
    <section className="">
        <h2>Get in on the action!</h2>
        <h3>Sign up Today</h3>
        <form action="" className="" method="POST" id='landing-user'>
        <input id="landing-username" type="text" placeholder="Username" />
        <input id="landing-email" type="email" placeholder="Email Address" />
        <input id="landing-submit" type="submit" value="Sign up!" className="btn" />
        </form>
        </section>
    )}