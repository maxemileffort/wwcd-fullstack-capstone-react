import React, { Fragment } from 'react';


export default function Errors(props){
    return(
        <Fragment >
            <div style={{color: 'red'}} id="error">{props.appState.error}</div>
            <div style={{color: 'lightgreen'}} id="confirmation">{props.appState.confirmation}</div>
        </Fragment>
    )
}


