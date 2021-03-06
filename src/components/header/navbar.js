import React, {Fragment} from 'react';
import { Link } from "react-router-dom";

// need to add this functinality for when screen is smaller than 100px,
// clicking hamburger menu expands menu
// $('.toggleNav').on('click', function() {
//   $('.flex-nav ul').toggleClass('open');
// });

export default function Navbar(props){
  console.log(props)
  return (
  <nav className="flex-nav">
    <Link to="#" className="toggleNav" 
    	onClick={event=>{
        event.preventDefault()
        if(!document.querySelector('.flex-nav ul').classList.contains('open')){
          document.querySelector('.flex-nav ul').classList.add('open')
        } else if(document.querySelector('.flex-nav ul').classList.contains('open')){
					document.querySelector('.flex-nav ul').classList.remove('open')
        }
      }
    }>
      <i className="fas fa-bars"></i> Menu
    </Link>
    <ul onClick={()=>{
      if(!document.querySelector('.flex-nav ul').classList.contains('open')){
        document.querySelector('.flex-nav ul').classList.add('open')
      } else if(document.querySelector('.flex-nav ul').classList.contains('open')){
        document.querySelector('.flex-nav ul').classList.remove('open')
      }
    }}>
      <li><Link to="/">Home</Link></li>
      
      {/* <li><Link to="#">News</Link></li> feature to be added later*/}
      <li><Link to="/about">About</Link></li>
      <li><Link to="/contact">Contact</Link></li>
      <li className="sidebar-open"
          onClick={(event)=>{
            event.preventDefault();
            document.querySelector('.sidebar').style.display = "block";
            document.querySelector('.sidebar').style.width = "100%";
        }}
      >
        <Link to="#"><i className="far fa-question-circle sidebar-open"></i> Help</Link>
      </li>
      {/* check to see if user is logged in and render logout/login accordingly */}
      {props.isLoggedIn ? (
        <Fragment>
          <li><Link to="/dashboard/">Dashboard</Link></li>
          <li><Link to="/" onClick={()=>props.handleLogout()}>Log Out</Link></li>
        </Fragment>
      ) : (
        <li><Link to="/user/login">Log In</Link></li>
        )}
    </ul>
  </nav>
      
)}