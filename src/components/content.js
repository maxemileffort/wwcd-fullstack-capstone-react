import React, { Fragment } from 'react';
import { Route } from "react-router-dom";

import LandingPage from './landing-page';
import Dashboard from './dashboard';
import Login from './login'
import Signup from './signup'
import Admin from './admin'
import About from './about'
import Contact from './contact'

export default function Content(_props){
    console.log(_props)
    return(
        <Fragment>
            <Route exact path='/' render={(props)=><LandingPage routerProps={props}/>} />
            <Route path='/dashboard' render={(props)=><Dashboard routerProps={props} {..._props}/>} />
            <Route exact path='/user/login' render={(props)=><Login routerProps={props} {..._props}/>} />
            <Route exact path='/user/create' render={(props)=><Signup routerProps={props} {..._props}/>} />
            <Route exact path='/admin' render={(props)=><Admin routerProps={props} {..._props}/>} />
            <Route exact path='/about' component={About} />
            <Route exact path='/contact' component={Contact} />
        </Fragment>
    )
}