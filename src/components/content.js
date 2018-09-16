import React, { Fragment } from 'react';
import { BrowserRouter as Router,
  Route, 
  Link, 
  Redirect,
} from "react-router-dom";

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
            {/* TODO: Make sure user is logged in before going to dashboard */}
            <Route path='/dashboard' render={(props)=><Dashboard routerProps={props} {..._props}/>} />
            {/* TODO: Check and see if user is logged in and route to dashboard instead of login */}
            <Route exact path='/user/login' render={(props)=><Login routerProps={props} {..._props}/>} />
            <Route exact path='/user/create' render={(props)=><Signup routerProps={props} {..._props}/>} />
            {/* TODO: Make sure user has rights before letting them access admin */}
            <Route exact path='/admin' render={(props)=><Admin routerProps={props} {..._props}/>} />
            <Route exact path='/about' component={About} />
            <Route exact path='/contact' component={Contact} />
        </Fragment>
    )
}