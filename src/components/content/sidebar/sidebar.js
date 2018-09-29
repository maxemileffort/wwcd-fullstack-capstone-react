import React from 'react';
import { Route } from "react-router-dom";

import HomeHelp from './home-help'
import AboutHelp from './about-help'
import AccountHelp from './account-help'
import ContactHelp from './contact-help'
import DashboardHelp from './dashboard-help'
import SignupHelp from './signup-help'
import LoginHelp from './login-help'

export default function Sidebar(){
    return(
        <section className='sidebar'>
            <Route exact path='/' component={HomeHelp} />
            <Route exact path='/about' component={AboutHelp} />
            <Route exact path='/account' component={AccountHelp} />
            <Route exact path='/contact' component={ContactHelp} />
            <Route exact path='/dashboard' component={DashboardHelp} />
            <Route exact path='/user/create' component={SignupHelp} />
            <Route exact path='/user/login' component={LoginHelp} />
        </section>
    )
}