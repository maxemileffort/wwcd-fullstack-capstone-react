import React from 'react';
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
        <span>
            <Route exact path='/' render={(props)=><LandingPage props={props}/>} />
            <Route path='/dashboard' render={(props)=><Dashboard props={props}/>} />
            <Route exact path='/user/login' render={(props)=><Login props={props} handleLogin={_props.handleLogin}/>} />
            <Route exact path='/user/create' render={(props)=><Signup props={props}/>} />
            <Route exact path='/admin' render={(props)=><Admin props={props}/>} />
            <Route exact path='/about' component={About} />
            <Route exact path='/contact' component={Contact} />
        </span>
    )
}