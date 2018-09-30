import React, { Fragment } from 'react';
import { withRouter } from "react-router-dom";
import axios from 'axios';
  
import Header from './header/header'
import Errors from './misc/errors'
import Content from './content/content'
import Footer from './misc/footer'


// for axiosConfigs, just uncomment out which one
// dev baseURL: 
// const baseURL = "http://localhost:8080/"
// prod proxy:
const baseURL = "https://dfs-analytics-react-capstone.herokuapp.com/" 

// for use only with axios calls that route to '/auth/' endpoints
let basicConfig = {baseURL}; 
let authConfig; // assigned in the login method

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

    hideErrorsAndConfirmations = ()=>{
        if (this.state.error){
                this.setState({
                    error: null
                })
        }
        if (this.state.confirmation){
                this.setState({
                    confirmation: null
                })
        }
    }

    sendMessage = (msgObj) => {
        console.log(msgObj);

        let url = '/message/send/'

        axios.post(url, msgObj, basicConfig)
        .then(response=>{
            console.log(response.data.message)
        })
        .catch(err=>{
            console.log(err)
        })
    }

    handleLogin = (email, password)=>{
        console.log('Trying to login.')
        
        if (!email || !password){
            return this.setState({
                error: "Please enter a valid email and password combination."
            })
        } else {
            let url = '/auth/user/login'
            
            // doesn't use the token, so doesn't need the auth config
            axios.post(url, {
                email,
                password
            }, basicConfig)
            .then((response)=>{
                // if response has data.user object...
                if (response.data.user){
                    this.setState({
                        loggedIn: true,
                        user: response.data.user,
                        error: null,
                        confirmation: null
                    })
                    window.localStorage.setItem('wwcddfstoken', response.data.token)

                    authConfig = {
                        baseURL,
                        headers: { 
                            "Authorization": window.localStorage.getItem('wwcddfstoken') || null,
                        }
                    }

                    if(this.state.user.accountType === 'Admin'){
                        // if user that logs in is Admin, route to admin page
                        this.props.history.push("/admin")
                    } else if (this.state.user.accountType === 'Free' || this.state.user.accountType === 'Pro'){
                        // if they are a member but not admin, take user to dashboard
                        this.props.history.push("/dashboard")
                    }
                }
                else {
                    //otherwise, rerender login page
                    this.setState({
                        error: "Authentication failed."
                    })
                    this.props.history.push("/user/login")
                }
            })
            .catch((error)=>{
                console.log(error);
                this.setState({
                    error: "Authentication failed."
                })
                this.props.history.push("/user/login")
            });
        }
    }

    checkEmailExists = (inputEmail) => {
        // clear the error before checking again
        this.setState({
            error: null
        })

        let url = `/check-duplicate-email/${inputEmail}`
        
        axios.get(url, basicConfig)
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
        }, basicConfig)
        .then((response)=>{
            this.setState({
                confirmation: `${response.data.message} You will be returned to the home screen in 5 seconds. To activate your account, please login again.`
            })
            setTimeout(this.handleLogout, 5000);
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
        this.props.history.push("/");
        this.setState({
            loggedIn: false,
            user: null,
            error: null,
            confirmation: null
        })
        window.localStorage.removeItem('wwcddfstoken');
    }

    sendStatsToDb = (season, week) => {
		let period = {
			season,
			week
        };
        
        let url = '/send-stats-to-db'
        
        axios.post(url, period, authConfig)
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
            baseURL, 
            headers: { 
                "Authorization": window.localStorage.getItem('wwcddfstoken') || null,
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

        axios.put(url, updateObj, authConfig)
        .then(response=>{
            console.log(response)
            this.setState({
                confirmation: `${response.data.message}. For your security, you will be logged out. Please login again.`
            })
            setTimeout(this.handleLogout, 5000);
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

        axios.delete(url, authConfig)
        .then(response=>{
            console.log(response);
            this.props.history.push('/');
            this.setState({
                confirmation: response.data.message,
                user: null,
                loggedIn: false
            })
            window.localStorage.removeItem('wwcddfstoken')
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
            <Fragment>
                <div className="wrapper" onClick={this.hideErrorsAndConfirmations}>
                    <Header isLoggedIn={this.state.loggedIn} handleLogout={this.handleLogout} />
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
                        sendMessage={this.sendMessage}/>
                    <Footer />
                </div>
            </Fragment>
        )
    }
}

export default withRouter(App)

