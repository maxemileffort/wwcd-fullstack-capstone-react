import React from 'react';

import Cta from '../misc/cta';

export default function Contact(props){
    let username = React.createRef();   
    let email = React.createRef();
    let message = React.createRef();
    return (
        <div className="contact-form">
            <h1>Contact</h1>
            <p>
                Feel free to send me a message.
            </p>
            <form method="post" 
                onSubmit={event=>{
                    event.preventDefault();
                    let msgObj = {
                        username: username.current.value,
                        email: email.current.value,
                        message: message.current.value
                    }
                    props.sendMessage(msgObj)
                }
            }>
                <input ref={username} type="text" id="contact-username" placeholder="Username" />
                <input ref={email} type="email" id="contact-email" placeholder="Email"/>
                <textarea ref={message} id="contact-message" placeholder="Message..."/>
                <input type="submit" id="contact-submit" className="btn"/>
            </form>
            <Cta />
        </div>
    )
}