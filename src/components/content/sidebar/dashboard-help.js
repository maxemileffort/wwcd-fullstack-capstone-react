import React from 'react';

export default function DashboardHelp(){
    return(
        <div>
            <h3>
                Welcome to your dashboard.
            </h3>
            <p>
                This is where the magic happens.
            </p>
            <p>
                Choose whichever time period you're looking for, and pick a player position. After that, there is a field called "Average Type."
            </p>
            <p>
                <strong className="underline">Average:</strong> just an average of several experts from the internet.
            </p>
            <p>
                <strong className="underline">Weighted:</strong> these averages are weighted, based on accuracy of previous projections, with more weight given to experts that are correct more often.
            </p>
            <p>
                <strong className="underline">Robust:</strong> this average attempts to control for crazy outlier projections.
            </p>
            <p>
                Once the search completes, you can click on any player to bring up another tab that shows the player and any news associated with them. Useful for injury reports and things like that.
            </p>
            <p>
                At the bottom, there are some tabs, with the top 5 players in their respective categories. The last category, Insight, is a special category that relates points to Tier and Rank.
            </p>
            <p>
                Play around, see if you like what comes through the machine. Feel free to send me any messages on the Contact page.
            </p>
            <p>
                NOTE: Currently there are some errors with iOS, and also, there is usually an error where at least one of the Insight players has 0 points. These are being worked on.
            </p>
        </div>
    )
}