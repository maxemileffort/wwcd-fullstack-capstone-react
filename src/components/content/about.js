import React from 'react'

import Cta from '../misc/cta';

export default function About (){
    return (
        <div className="shrink">
            <h1>About</h1>
            <p>Hi. My name is Max, and I run this little page.</p>
            <p>
                I started WWCD because I have a knack for winning a couple of DFS games, only to lose most of those winnings on the next
                go around. I do this, and it seems I am in good company because my frustrations are echoed in other places on the web. 
                So I set out to learn a few things to give me some sort of edge so that I could enjoy winning more and stop picking busts in my lineups.
            </p>
            <p>
                If you feel the same way, then know that you're not alone. Click that button down below, and let's get started on your next winning streak!
            </p>
            <Cta />
        </div>
    )
}