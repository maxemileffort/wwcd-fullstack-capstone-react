import React from 'react';
import { withRouter } from "react-router-dom";
import axios from 'axios';
  
import Header from './header'
import Errors from './errors'
import Content from './content'
import Footer from './footer'

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

    deleteMessages = (id) => {
        let url = "/message-delete"+id
        axios.delete(url)
        .then(response=>{
            console.log(response)
            this.setState({
                confirmation: response.data.message
            })
            
             
        })
        .catch(error=>{
            console.log(error)
            this.setState({
                error: "Something went wrong. Please try again later."
            })
        })
    }

    markMessageRead = (id) => {
        console.log(id)
        let url = `/message/mark-read/${id}`
        axios.put(url, {})
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

    postMessages = (obj) => {
        let url = "/send-message"
        axios.post(url, obj)
        .then(response=>{
            console.log(response)
            this.setState({
                confirmation: response.data.message
            }) 
        })
        .catch(error=>{
            console.log(error)
            this.setState({
                error: "Something went wrong. Please try again later."
            })
        })
    }

    getMessages = (str) => {
        let url = '/get-messages'
        axios.get(url)
        .then(response=>{
            console.log(response) 
            if (str === "unread"){
                let unread = response.data.filter(item=>{return item.read === false});
                
                let output = "<ul>";
                unread.forEach(el=>{
                    let fx = `{()=>{
                        props.markMessageRead(${el._id})
                    }
                    }`
                    output += `<li><p>Userame: ${el.username}</p>
                    <p>Email: ${el.email}</p>
                    <p>Time: ${el.timeStamp}</p>
                    <p>Message: ${el.message}</p>
                    <Button className="btn" 
                    onClick=${fx}>Mark Read</button></li>
                    <hr>`;
                })
                output += "</ul>"
                document.querySelector('#unread-messages').innerHTML = output;
            } else if (str === "all"){
                let msgs = response.data;
                let output = "<ul>";
                msgs.forEach(el=>{
                    let fx = `{()=>{
                        event.preventDefault();
                        props.deleteMessages(${el._id})
                    }`
                    output += `<li><p>Userame: ${el.username}</p>
                    <p>Email: ${el.email}</p>
                    <p>Time: ${el.timeStamp}</p>
                    <p>Message: ${el.message}</p>
                    <button className="btn" onClick=${fx}
                    >Delete</button></li>
                    <hr />`;
                })
                output += "</ul>"
                document.querySelector('#all-messages').innerHTML = output;
            } else {
                return false
            }
        })
        .catch(error=>{
            console.log(error)
            this.setState({
                error: "Something went wrong. Please try again later."
            })
        })
    }

    handleLogin = (email, password)=>{
        console.log('Trying to login.')
        let _email = email.current.value;
        let _password = password.current.value;

        let url = '/user/login/'

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

        let url = '/user/update'

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

        let url = '/user/delete/'+email

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