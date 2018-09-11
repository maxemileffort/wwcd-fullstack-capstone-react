import React from 'react';

export default function Navbar(){
    return (
    <nav className="flex-nav">
      <a href="#" className="toggleNav"><i className="fas fa-bars"></i> Menu</a>
      <ul>
        <li><a href="./index.html">Home</a></li>
        <li><a href="#">News</a></li>
        <li><a href="#">Your Lineups</a></li>
        <li><a href="#">Sign Up</a></li>
        <li><a href="#">About Us</a></li>
        <li><a href="#">Contact</a></li>
        <li className="social">
          <a href="#"><i className="fab fa-twitter"></i></a>
        </li>
        <li className="social">
          <a href="#"><i className="fab fa-facebook-square"></i></a>
        </li>
        <li className="social">
          <a href="#"><i className="fab fa-instagram"></i></a>
        </li>
      </ul>
    </nav>
        
    )}