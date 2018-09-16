import React, {Fragment} from 'react';
import { BrowserRouter as Router,
  Route, 
  Link, 
  Redirect,
  withRouter 
} from "react-router-dom";

export default function Navbar(props){
  console.log(props.props)
  return (
  <nav className="flex-nav">
    <Link to="#" className="toggleNav"><i className="fas fa-bars"></i> Menu</Link>
    <ul>
      <li><Link to="/">Home</Link></li>
      {/* check to see if user is logged in and render logout/login accordingly */}
      {props.props.isLoggedIn ? (
        <Fragment>
          <li><Link to="/dashboard/">Dashboard</Link></li>
          <li><Link to="/user/login" onClick={()=>props.props.handleLogout()}>Log Out</Link></li>
        </Fragment>
      ) : (
        <li><Link to="/user/login">Log In</Link></li>
        )}
      {/* <li><Link to="#">News</Link></li> feature to be added later*/}
      <li><Link to="/about">About Us</Link></li>
      <li><Link to="/contact">Contact</Link></li>
      <li className="social">
        <a href="https://www.twitter.com" target="_blank"><i className="fab fa-twitter"></i></a>
      </li>
      <li className="social">
        <a href="https://www.facebook.com" target="_blank"><i className="fab fa-facebook-square"></i></a>
      </li>
      <li className="social">
        <a href="https://www.instagram.com" target="_blank"><i className="fab fa-instagram"></i></a>
      </li>
    </ul>
  </nav>
      
)}