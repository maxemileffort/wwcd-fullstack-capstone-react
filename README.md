# Winner Winner, Chicken Dinner

### An App for DFS

Active link: https://wwcd-dfs.herokuapp.com/

Technology used: React, Express, Node, MongoDB, R, Docker, Mailgun

Backend Repo: https://github.com/maxemileffort/wwcd-fullstack-capstone-node

## Idea:
I've been an NFL DFS player for about 8 years at the time of this writing, and I have always had very modest amounts of luck.

The most I'd win in any one season was between $50 and $100. But I would read about guys that use technology to pull in $200k weekly.

Now, this app doesn't promise anything remotely close to that (although if it helps you get there, you're welcome.), but it was something that was fun to me.

And, also at the time of this writing, it did help me win $130 from a $30 investment in one weekend, which is the best I had ever done. So there's that.

## Images:

![landing-page](https://raw.githubusercontent.com/maxemileffort/wwcd-fullstack-capstone-react/master/public/screenshots/landing.PNG)
*Landing page*

![login](https://raw.githubusercontent.com/maxemileffort/wwcd-fullstack-capstone-react/master/public/screenshots/login.PNG)
*Login*

![signup](https://raw.githubusercontent.com/maxemileffort/wwcd-fullstack-capstone-react/master/public/screenshots/signup.PNG)
*Signup*

![admin](https://raw.githubusercontent.com/maxemileffort/wwcd-fullstack-capstone-react/master/public/screenshots/admin.PNG)
*Admin page, where new, weekly stats are added to the database*

![dashboard-initial](https://raw.githubusercontent.com/maxemileffort/wwcd-fullstack-capstone-react/master/public/screenshots/dashboard-initial.PNG)
*Dashboard, initially*

![player-list](https://raw.githubusercontent.com/maxemileffort/wwcd-fullstack-capstone-react/master/public/screenshots/player-list.PNG)
*Player list, after user submits selection*

![tabs](https://raw.githubusercontent.com/maxemileffort/wwcd-fullstack-capstone-react/master/public/screenshots/tabs.PNG)
*Info Tabs*

![contact](https://raw.githubusercontent.com/maxemileffort/wwcd-fullstack-capstone-react/master/public/screenshots/contact.PNG)
*Contact form*

![help](https://raw.githubusercontent.com/maxemileffort/wwcd-fullstack-capstone-react/master/public/screenshots/help.PNG)
*Help box*

## Planning:

![wireframe](https://raw.githubusercontent.com/maxemileffort/wwcd-fullstack-capstone-react/master/public/screenshots/wireframe.jpg)
*Basic wireframe.*

There were a lot of features in this stage that I had to remove due to them being much more complicated than I had initially realized, like the news features and the social media stuff. However, they are planned for future versions.

Also, this app only supports DraftKings currently. There are plans to add support for Fanduel in the pipeline.

### On to the flow of the app:

When users first land, they can either signup or login.

After signing up, users will be asked to login again to 'activate' their account.

Once logged in, admin users are taken to the admin page, where they can redirect to the dashboard.

Other users are taken straight to their dashboard.

There, users can select a week during a season and view aggregated projections for NFL players, as well as some summary statistics at the bottom in the tabs.

There's also a help option in the main navbar that renders different messages depending on what page the user is on.

And lastly, there is a contact form where the user can submit a message that emails me directly.

### Features to be added later:
- Make the player list searchable
- Other sports (MLB, NBA)
- Player news
- Social media blast

This project was bootstrapped with [Create React App](https://github.com/facebookincubator/create-react-app).


