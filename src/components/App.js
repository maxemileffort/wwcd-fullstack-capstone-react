import React from 'react';
import { withRouter } from "react-router-dom";
import axios from 'axios';
  
import Header from './header'
import Content from './content'
import Footer from './footer'

class App extends React.Component{ 
    
    constructor(props){
        super(props)
        this.state = {
            loggedIn: false,
            user: null,
            error: null
        }
    }

    handleLogin = (email, password)=>{
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
                user: response.data.user,
                error: null
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
                error: "Auth failed."
            })
            this.props.history.push("/user/login")
          });
    }

    checkEmailExists = (inputEmail) => {
        // clear the error before checking again
        this.setState({
            error: null
        })

        let url = `https://dfs-analytics-react-capstone.herokuapp.com/check-duplicate-email/${inputEmail}`
        
        axios.get(url)
        .then(response=>{
            console.log(response)
            if (response.data.entries.length !== 0){
                this.setState({
                    error: "Cannot use this email address."
                })
                document.querySelector("#create-submit").setAttribute("disabled", "disabled")
                document.querySelector("#account-update-submit").setAttribute("disabled", "disabled")
            } else {
                document.querySelector("#create-submit").removeAttribute("disabled")
                document.querySelector("#account-update-submit").removeAttribute("disabled")
            }
        })
        .catch(error=>{
            console.log(error)
            this.setState({
                error: "Cannot use this email address."
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
            axios.post('https://dfs-analytics-react-capstone.herokuapp.com/user/create/', {
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

    handleLogout = () => {
        this.setState({
            loggedIn: false,
            user: null,
            error: null
        })
    }

    sendStatsToDb = (season, week) => {
		let period = {
			season,
			week
        };
        
        let url = 'https://dfs-analytics-react-capstone.herokuapp.com/send-stats-to-db'
        
        axios.post(url, period)
        .then(response=>{
            console.log(response)
        })
        .catch(err=>{
            console.log(err)
        })
    }
    
    sendSalariesToDb = (file) => {
        let url = 'https://dfs-analytics-react-capstone.herokuapp.com/send-salaries-to-db/';

        // stackoverlow solution with axios
        // var formData = new FormData();
        // var imagefile = document.querySelector('#file');
        // formData.append("image", imagefile.files[0]);
        // axios.post(url, file, {
        //     headers: {
        //       'Content-Type': 'multipart/form-data'
        //     }
        // }).then(response=>{console.log(response)}).catch(err=>{console.log(err)})
    }
    
    handleAccountUpdate = (updateObj) => {
        console.log("Updating account")
        console.log(updateObj)
    }

    render(){
        return(
            <div className="wrapper">
                <Header isLoggedIn={this.state.loggedIn} handleLogout={this.handleLogout}/>
                <div style={{color: 'red'}} id="error">{this.state.error}</div>
                <Content 
                    appState={this.state} 
                    handleLogin={this.handleLogin} 
                    handleSignup={this.handleSignup}
                    checkEmailExists={this.checkEmailExists}
                    sendStatsToDb={this.sendStatsToDb}
                    sendSalariesToDb={this.sendSalariesToDb}
                    handleAccountUpdate={this.handleAccountUpdate}
                    />
                <Footer />
            </div>
        )
    }

}

export default withRouter(App)