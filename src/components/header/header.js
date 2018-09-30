import React from 'react';

import Hero from './hero'
import Navbar from './navbar'
import Sidebar from '../content/sidebar/sidebar';

export default function Header(props){
    console.log(props)
    return(
        <div>
            <Hero />
            <Navbar {...props}/>
            <Sidebar />
        </div>
        )}