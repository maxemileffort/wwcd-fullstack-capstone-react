import React from 'react';
import { withRouter } from "react-router-dom";
import axios from 'axios';
  
import Header from './header/header'
import Errors from './misc/errors'
import Content from './content/content'
import Footer from './misc/footer'

class App extends React.Component{ 
    
    constructor(props){
        super(props)
        this.state = {
            loggedIn: false,
            user: null,
            error: null,
            confirmation: null
        }
    }

    handleLogin = (email, password)=>{
        console.log('Trying to login.')
        let _email = email.current.value;
        let _password = password.current.value;

        let url = '/auth/user/login/'

        axios.post(url, {
            email: _email,
            password: _password
        })
        .then((response)=>{
            if (response.data.user){
                this.setState({
                    loggedIn: true,
                    user: response.data.user,
                    error: null,
                    confirmation: null
                })
                window.localStorage.setItem('token', response.data.token)
                if(this.state.user.accountType === 'Admin'){
                    // if user that logs in is Admin, route to admin page
                    this.props.history.push("/admin")
                } else if (this.state.user.accountType === 'Free' || this.state.user.accountType === 'Pro'){
                    // if they are a member but not admin, take user to dashboard
                    this.props.history.push("/dashboard")
                }
            }
             else {
                //otherwise, refresh login page
                this.setState({
                    error: "Authentication failed."
                })
                this.props.history.push("/user/login")
            }
        })
        .catch((error)=>{
            console.log(error);
            this.setState({
                error: "Something went wrong logging you in."
            })
            this.props.history.push("/user/login")
          });
    }

    checkEmailExists = (inputEmail) => {
        // clear the error before checking again
        this.setState({
            error: null
        })

        let url = `/check-duplicate-email/${inputEmail}`
        
        axios.get(url)
        .then(response=>{
            console.log(response)
            if (response.data.entries.length > 0){
                this.setState({
                    error: "Cannot use this email address."
                })
                if (document.querySelector("#create-submit")){
                    document.querySelector("#create-submit").setAttribute("disabled", "disabled")
                }
                if (document.querySelector("#account-update-submit")){
                    document.querySelector("#account-update-submit").setAttribute("disabled", "disabled")
                }
            } else {
                if (document.querySelector("#create-submit") && document.querySelector("#create-submit").hasAttribute('disabled')){
                    document.querySelector("#create-submit").removeAttribute("disabled")
                }
                if (document.querySelector("#account-update-submit") && document.querySelector("#account-update-submit").hasAttribute('disabled')){
                    document.querySelector("#account-update-submit").removeAttribute("disabled")
                }
            }
        })
        .catch(error=>{
            console.log(error)
            this.setState({
                error: "Something went wrong. Please try again later."
            })
        })
    }

    handleSignup = (email, username, password1, password2)=>{
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
                error: `All fields required`
            })
            return false;
        } else if(_password1 !== _password2){
            this.setState({
                error: `Passwords must match.`
            })
            return false;
        } else {
            let url = '/user/create/'

            axios.post(url, {
            email: _email,
            username: _username,
            password: _password1
        })
        .then((response)=>{
            this.setState({
                loggedIn: true,
                user: response.data.user,
                error: null
            })
            this.props.history.push("/")
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

    handleLogout = () => {
        this.setState({
            loggedIn: false,
            user: null,
            error: null,
            confirmation: null
        })
    }

    sendStatsToDb = (season, week) => {
		let period = {
			season,
			week
        };
        
        let url = '/send-stats-to-db'
        
        axios.post(url, period)
        .then(response=>{
            console.log(response)
            this.setState({
                confirmation: response.data.msg
            })
        })
        .catch(err=>{
            console.log(err)
        })
    }
    
    sendSalariesToDb = (formData) => {
        let url = '/send-salaries-to-db/';
        
        axios.post(url, formData, {
            headers: {
              'Content-Type': 'multipart/form-data'
            }
        })
        .then(response=>{
            console.log(response)
            this.setState({
                confirmation: response.data.msg
            })
        })
        .catch(err=>{
            console.log(err)
        })
    }
    
    handleAccountUpdate = (updateObj) => {
        console.log("Updating account")
        console.log(updateObj)

        let url = '/auth/user/update'

        axios.put(url, updateObj)
        .then(response=>{
            console.log(response)
        })
        .catch(error=>{
            console.log(error)
            this.setState({
                error: "Something went wrong. Please try again later."
            })
        })
    }

    handleAccountDelete = () => {
        console.log("Deleting account")
        let email = this.state.user.email
        console.log(email)

        let url = '/auth/user/delete/'+email

        axios.delete(url)
        .then(response=>{
            console.log(response)
            this.setState({
                confirmation: response.data.message
            })
            this.props.history.push("/")
            this.handleLogout();
        })
        .catch(error=>{
            console.log(error)
            this.setState({
                error: "Something went wrong. Please try again later."
            })
        })
    }

    render(){
        return(
            <div className="wrapper">
                <Header isLoggedIn={this.state.loggedIn} handleLogout={this.handleLogout}/>
                <Errors appState={this.state}/>
                <Content 
                    appState={this.state} 
                    handleLogin={this.handleLogin} 
                    handleSignup={this.handleSignup}
                    checkEmailExists={this.checkEmailExists}
                    sendStatsToDb={this.sendStatsToDb}
                    sendSalariesToDb={this.sendSalariesToDb}
                    handleAccountUpdate={this.handleAccountUpdate}
                    handleAccountDelete={this.handleAccountDelete}
                    getMessages={this.getMessages}
                    postMessages={this.postMessages}
                    deleteMessages={this.deleteMessages}
                    markMessageRead={this.markMessageRead}
                    />
                <Footer />
            </div>
        )
    }

}

export default withRouter(App)

// for package.json
// dev proxy: 
// "proxy": "http://localhost:8080"
// prod proxy:
// "proxy": "https://dfs-analytics-react-capstone.herokuapp.com/"