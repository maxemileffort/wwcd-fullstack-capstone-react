import React, { Fragment } from 'react';


export default function Messages(props){


    return(
        <Fragment >
            <div style={{color: 'red'}} id="error">{props.appState.error}</div>
            <div style={{color: 'green'}} id="statsMsg">{props.appState.statsMsg}</div>
            <div style={{color: 'green'}} id="salaryMsg">{props.appState.salaryMsg}</div>
        </Fragment>
    )
}



