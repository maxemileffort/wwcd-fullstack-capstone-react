import React, { Fragment } from 'react';
import { Route } from "react-router-dom";

import Sidebar from './sidebar/sidebar';
import LandingPage from './landing-page';
import Dashboard from './dashboard/dashboard';
import Account from './dashboard/account';
import Login from './login'
import Signup from './signup'
import Admin from './admin'
import About from './about'
import Contact from './contact'

export default function Content(_props){
    console.log(_props)
    return(
        <Fragment>
            <Route path='/' component={Sidebar} />
            <Route exact path='/' render={(props)=><LandingPage routerProps={props}/>} />
            <Route exact path='/about' component={About} />
            <Route exact path='/account' render={(props)=><Account routerProps={props} {..._props}/>} />
            <Route exact path='/admin' render={(props)=><Admin routerProps={props} {..._props}/>} />
            <Route exact path='/contact' render={(props)=><Contact routerProps={props} {..._props}/>} />
            <Route exact path='/dashboard' render={(props)=><Dashboard routerProps={props} {..._props}/>} />
            <Route exact path='/user/create' render={(props)=><Signup routerProps={props} {..._props}/>} />
            <Route exact path='/user/login' render={(props)=><Login routerProps={props} {..._props}/>} />
        </Fragment>
    )
}