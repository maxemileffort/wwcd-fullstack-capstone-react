import React from 'react'
import Hero from './hero'
import Navbar from './navbar'
import LandingPage from './landing-page'
import Cta from './cta'
import Footer from './footer'

export default class App extends React.Component{ // use react router to change whats rendered between header and footer
    render(){
        return(
            <div className="wrapper">
                <Hero />
                <Navbar />
                <LandingPage />
                <Cta />
                <Footer />
            </div>
        )
    }

}