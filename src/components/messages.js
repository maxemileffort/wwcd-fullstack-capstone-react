import React, { Fragment } from 'react';


export default function Messages(props){
    let unread = "unread"
    let all = "all"
    
    return(
        <Fragment >
            <div id="unread-messages">
            </div>
            <button className="btn"
                onClick={()=>{
                    props.getMessages(unread)
                }}
            >Load Unread Messages</button>
            <div id="all-messages">
            <hr />
            </div>
            <button className="btn"
                onClick={()=>{
                    props.getMessages(all)
                }}
            >Load All Messages</button>
        </Fragment>
    )
}



