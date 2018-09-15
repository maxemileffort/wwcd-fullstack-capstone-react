import React from 'react';

import Hero from './hero'
import Navbar from './navbar'

export default function Header(props){
    return(
        <div>
            <Hero />
            <Navbar props={props}/>
        </div>
        
        )}