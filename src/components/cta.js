import React from 'react'
import { Link } from "react-router-dom";
  
export default function Cta(props){
    
    return(
        <section className="">
            <h2>Get in on the action!</h2>
            <Link to="/user/create">Sign up Today</Link>
        </section>
    )}