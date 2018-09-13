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

export default function Content(state){
    console.log(state)
    return(
        <div>
            <Route exact path='/' render={(props)=><LandingPage {...props} state={state}/>} />
            <Route path='/dashboard' render={(props)=><Dashboard {...props} state={state}/>} />
            <Route exact path='/login' render={(props)=><Login {...props} state={state}/>} />
            <Route exact path='/signup' render={(props)=><Signup {...props} state={state}/>} />
            <Route exact path='/admin' render={(props)=><Admin {...props} state={state}/>} />
            <Route exact path='/about' render={(props)=><About {...props} state={state}/>} />
            <Route exact path='/contact' render={(props)=><Contact {...props} state={state}/>} />
        </div>
    )
}