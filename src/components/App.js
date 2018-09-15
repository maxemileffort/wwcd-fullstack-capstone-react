import React from 'react';
import { BrowserRouter as Router,
    Route, 
    Link, 
    Redirect,
  } from "react-router-dom";
import axios from 'axios'
  
import Header from './header'
import Content from './content'
import Footer from './footer'

export default class App extends React.Component{ 
    
    constructor(props){
        super(props)
        this.state = {
            loggedIn: false,
            user: null,
        }
        this.handleLogin = this.handleLogin.bind(this)
    }

    handleLogin(email, password){
        console.log('Trying to login.')
        let _email = email.current.value;
        let _password = password.current.value
        axios.post('https://dfs-analytics-react-capstone.herokuapp.com/user/login/', {
            email: _email,
            password: _password
          })
          .then(function (response) {
            console.log(response);
            this.setState({
                loggedIn: true,
                user: response.user
            })
            console.log(this.state.user)
          })
          .catch(function (error) {
            console.log(error);
          });
    }

    render(){
        return(
            <div className="wrapper">
                <Header props={this.state}/>
                <Content props={this.state} handleLogin={this.handleLogin}/>
                <Footer />
            </div>
        )
    }

}