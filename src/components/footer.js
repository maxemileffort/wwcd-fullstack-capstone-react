import React from 'react'

export default function Footer(){
    return (
        
        <footer role="contentinfo">
        <h2>Footer</h2>
          <nav class="flex-nav-footer">
            <h4>Check us out and give us a follow:</h4>
            <ul>
              <li class="social">
                <a href="#"><i class="fab fa-twitter"></i></a>
              </li>
              <li class="social">
                <a href="#"><i class="fab fa-facebook-square"></i></a>
              </li>
              <li class="social">
                <a href="#"><i class="fab fa-instagram"></i></a>
              </li>
            </ul>
          </nav>
        </footer>
    )
}