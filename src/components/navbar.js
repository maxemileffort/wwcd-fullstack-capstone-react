import React from 'react';
import { BrowserRouter as Router,
  Route, 
  Link, 
  Redirect,
  withRouter 
} from "react-router-dom";

function IsLoggedIn(props){
  if (props.loggedIn){
    return (<li><Link to={"/dashboard/"+props.user.username}>Your Lineups</Link></li>)
  } else {
    return (<li><Link to="/login">Log In</Link></li>)
  }
}

export default function Navbar(props){
  return (
  <nav className="flex-nav">
    <a href="#" className="toggleNav"><i className="fas fa-bars"></i> Menu</a>
    <ul>
      <li><Link to="/">Home</Link></li>
      {/* <li><Link to="#">News</Link></li> feature to be added later*/}
      <IsLoggedIn />
      <li><Link to="/about">About Us</Link></li>
      <li><Link to="/contact">Contact</Link></li>
      <li className="social">
        <Link to="https://www.twitter.com"><i className="fab fa-twitter"></i></Link>
      </li>
      <li className="social">
        <Link to="https://www.facebook.com"><i className="fab fa-facebook-square"></i></Link>
      </li>
      <li className="social">
        <Link to="https://www.instagram.com"><i className="fab fa-instagram"></i></Link>
      </li>
    </ul>
  </nav>
      
)}