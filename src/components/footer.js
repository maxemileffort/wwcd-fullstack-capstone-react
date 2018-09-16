import React from 'react'

export default function Footer(){
    return (
        
        <footer role="contentinfo">
          <nav className="flex-nav-footer">
            <h4>Check us out and give us a follow:</h4>
            <ul>
              <li className="social">
                <a href="https://www.twitter.com" target="_blank" rel="noopener noreferrer"><i className="fab fa-twitter"></i></a>
              </li>
              <li className="social">
                <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer"><i className="fab fa-facebook-square"></i></a>
              </li>
              <li className="social">
                <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer"><i className="fab fa-instagram"></i></a>
              </li>
            </ul>
          </nav>
        </footer>
    )
}