import React from 'react'

export default function LandingPage(){
    return (
        <main>
        <section className="">
        <h2>Sign up for Free</h2>
        <p>Tired of those rando jabronies beating you in the double-ups in DFS?</p>
        <p>How about when your sleeper never even gets out of bed? Grinds the gears, am I right?</p>
        <p>Maybe you just need an extra edge, to go to the next winning tier of the tournament plays?</p>
        <div className="">
        <a href="#">Join Team WWCD: <span className="underline">Signup</span></a>
        <a href="#">Already have an account? <span className="underline">Login</span></a>
        </div>
        </section>
        
        <section className="hero">
        <div className="news-buttons">
        <button className="btn news-up" title="Previous story"><i className="fas fa-chevron-up"></i></button>
        <div className="news-slider">
        <div className="story">
        <div className="story-text">
        <h4>News Title</h4>
        <p>News Headline - News Blurb... <a href="#">Read Story</a></p>
        </div>
        </div>
        <div className="story">
        <div className="story-text">
        <h4>News Title</h4>
        <p>News Headline - News Blurb... <a href="#">Read Story</a></p>
        </div>
        </div>
        </div>
        <button className="btn news-down" title="Next story"><i className="fas fa-chevron-down"></i></button>
        </div>
        </section>
        
        
        
        </main>
        
    )
}