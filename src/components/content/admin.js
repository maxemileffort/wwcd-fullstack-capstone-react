import React, { Fragment } from 'react'
import { Link, Redirect } from "react-router-dom";

export default function Admin(props){
    console.log(props)
    let season = React.createRef();
    let week = React.createRef();
    let file = React.createRef();
    if (!props.appState.loggedIn){
        return <Redirect to="/user/login" />
    } else if (props.appState.user.accountType !== "Admin"){
        return <Redirect to="/dashboard" />
    } else if (props.appState.user.accountType === "Admin"){
        return (
            <Fragment>
                <h2>Admin Page</h2>
                <section>
                    <form action="#" method="post" id="db-update" 
                        onSubmit={event=>{
                            event.preventDefault();
                            props.sendStatsToDb(season.current.value, week.current.value)
                            let formData = new FormData();
                            formData.append('salaries', file.current.files[0])
                            props.sendSalariesToDb(formData)
                        }}>
                        <p>Download <a className="link-no-box" href="https://www.draftkings.com/lineup/upload" target="_blank" rel="noopener noreferrer">Salaries</a></p>
                    <section>
                            <div className="file-chooser">
                                <h4>Upload Salaries Here</h4>
                                <input ref={file} type="file" name="salaries" id="salaries-file" accept=".csv"/>
                            </div>
                            <div className="projections-tool">
                                <h4>Projections</h4>
                                <input ref={season} type="number" name="season" id="season" placeholder="season"/>
                                <input ref={week} type="number" name="week" id="week" placeholder="week"/>
                                <input type="submit" className="btn admin-submit" value="Populate DB" />
                            </div>
                        </section>
                    </form>
                <div className="results"></div>
                <Link to="/dashboard">Dashboard</Link>
                </section>
            </Fragment>
            )
    } else {
       return <Redirect to="/" />
    }
}
