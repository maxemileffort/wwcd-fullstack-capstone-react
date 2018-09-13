import React from 'react';
import { BrowserRouter as Router,
    Route, 
    Link, 
    Redirect,
  } from "react-router-dom";
  
  import Header from './header'
  import LandingPage from './landing-page';
  import Dashboard from './dashboard';
  import Login from './login'
  import Signup from './signup'
  import Admin from './admin'
  import About from './about'
  import Contact from './contact'
  import Footer from './footer'

// import Content from './content'

export default class App extends React.Component{ 
    
    constructor(){
        super()
        this.state = {
            //loggedIn: false,
            loggedIn: true,
            //user: null,
            user: {accountType: "Admin", username: "Admin"},
            // user: {accountType: "Free", username: "Free"},
        }
    }

    render(){
        return(
            <div className="wrapper">
                <Header props={this.state}/>
                {/* <Content props={this.state}/> */}
                <Route exact path='/' render={(props)=><LandingPage {...props} state={this.state}/>} />
                <Route path='/dashboard' render={(props)=><Dashboard {...props} state={this.state}/>} />
                <Route exact path='/login' render={(props)=><Login {...props} state={this.state}/>} />
                <Route exact path='/signup' render={(props)=><Signup {...props} state={this.state}/>} />
                <Route exact path='/admin' render={(props)=><Admin {...props} state={this.state}/>} />
                <Route exact path='/about' render={(props)=><About {...props} state={this.state}/>} />
                <Route exact path='/contact' render={(props)=><Contact {...props} state={this.state}/>} />
                <Footer />
            </div>
        )
    }

}