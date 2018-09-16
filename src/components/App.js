import React from 'react';
import { BrowserRouter as Router,
    Route, 
    Link, 
    Redirect,
    withRouter
  } from "react-router-dom";
import axios from 'axios'
  
import Header from './header'
import Content from './content'
import Footer from './footer'
import Admin from './admin';

class App extends React.Component{ 
    
    constructor(props){
        super(props)
        this.state = {
            loggedIn: false,
            user: null,
            error: null
        }
        this.handleSignup = this.handleSignup.bind(this)
        this.handleLogin = this.handleLogin.bind(this)
        this.handleLogout = this.handleLogout.bind(this)
    }

    handleLogin(email, password){
        console.log('Trying to login.')
        let _email = email.current.value;
        let _password = password.current.value
        axios.post('https://dfs-analytics-react-capstone.herokuapp.com/user/login/', {
            email: _email,
            password: _password
          })
          .then((response)=>{
            this.setState({
                loggedIn: true,
                user: response.data.user
            })
            if(this.state.user.accountType === 'Admin'){
                // if user that logs in is Admin, route to admin page
                this.props.history.push("/admin")
            } else {
                // otherwise, take user to dashboard
                this.props.history.push("/dashboard")
            }
        })
        .catch((error)=>{
            console.log(error);
            this.setState({
                error: error
            })
            this.props.history.push("/")
          });
    }

    handleSignup(email, username, password1, password2){
        console.log('Trying to signup.')
        let _email = email.current.value;
        let _username = username.current.value;
        let _password1 = password1.current.value;
        let _password2 = password2.current.value;
        _email = _email.trim()
        _username = _username.trim()
        _password1 = _password1.trim()
        _password2 = _password2.trim()
        if(_username === '' || _email === '' || _password1 === '' || _password2 === ''){
            this.setState({
                error: `<p>All fields required</p>`
            })
            return false;
        } else if(_password1 !== _password2){
            this.setState({
                error: `<p>Passwords must match.</p>`
            })
            return false;
        } else {
            axios.post('https://dfs-analytics-react-capstone.herokuapp.com/user/create/', {
            email: _email,
            username: _username,
            password: _password1
        })
        .then((response)=>{
            this.setState({
                loggedIn: true,
                user: response.data.user
            })
            // route to dashboard after successfully creating user
            this.props.history.push("/dashboard")
        })
        .catch((error)=>{
            console.log(error);
            this.setState({
                error: error
            })
            this.props.history.push("/")
        });
        }
    }

    handleLogout(){
        this.setState({
            loggedIn: false,
            user: null,
            error: null
        })
    }

    render(){
        return(
            <div className="wrapper">
                <Header isLoggedIn={this.state.loggedIn} handleLogout={this.handleLogout}/>
                <div style={{color: 'red'}} id="error">{this.state.error}</div>
                <Content props={this.state} handleLogin={this.handleLogin} handleSignup={this.handleSignup}/>
                <Footer />
            </div>
        )
    }

}

export default withRouter(App)