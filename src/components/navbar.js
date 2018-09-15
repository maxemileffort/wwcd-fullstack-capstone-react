import React from 'react';
import { BrowserRouter as Router,
  Route, 
  Link, 
  Redirect,
  withRouter 
} from "react-router-dom";


function IsLoggedIn(props){
  if (props.loggedIn){
    return (<li><Link to="/dashboard/">Dashboard</Link></li>)
  } else {
    return (<li><Link to="/user/login">Log In</Link></li>)
  }
}

export default function Navbar(props){
  
  return (
  <nav className="flex-nav">
    <Link to="#" className="toggleNav"><i className="fas fa-bars"></i> Menu</Link>
    <ul>
      <li><Link to="/">Home</Link></li>
      {/* <li><Link to="#">News</Link></li> feature to be added later*/}
      {IsLoggedIn(props)}
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