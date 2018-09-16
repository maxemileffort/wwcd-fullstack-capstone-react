import React from 'react'
import { BrowserRouter as Router,
    Route, 
    Link, 
    Redirect,
    withRouter 
  } from "react-router-dom";

export default function Admin(props){
    console.log(props)
    if (!props.props.loggedIn){
        return <Redirect to="/user/login" />
    } else if (props.props.user.accountType !== "Admin"){
        return <Redirect to="/dashboard" />
    } else if (props.props.user.accountType === "Admin"){
        return (
            <div>
                <h2>Admin Page</h2>
                <main className="main--unflex">
                    <form action="#" method="post" id="db-update">
                        <p>Download <Link className="link-no-box" to="https://www.draftkings.com/lineup/upload" target="_blank">Salaries</Link></p>
                        <section>
                            <div className="file-chooser">
                                <h4>Upload Salaries Here</h4>
                                <input type="file" name="salaries" id="salaries-file" accept=".csv"/>
                            </div>
                            <div className="projections-tool">
                                <h4>Projections</h4>
                                <input type="number" name="season" id="season" placeholder="season"/>
                                <input type="number" name="week" id="week" placeholder="week"/>
                                <input type="submit" className="btn admin-submit" value="Populate DB" />
                            </div>
                        </section>
                    </form>
                <div className="results"></div>
                <Link to="/dashboard">Dashboard</Link>
                </main>
            </div>
            )
    } else {
       return <Redirect to="/" />
    }
}
