# Udacity React Nanodegree Project 2 - The "Would You Rather" Game

## Some background and personal reflection

As in the previous Project, I started from scratch with Create React App as the starting point. Based off that I pulled in the [_DATA.js](https://github.com/udacity/reactnd-project-would-you-rather-starter) file that was provided to mock an in-memory database. The file contained not only some "seed data" but also an API of easy to use methods to interact with the mock database. 

This assignment proved quite a degree more challenging than Project 1 due to the added complexity working with Redux presented. Additionally there was no starter HTML or CSS boilerplate as in Project 1 so everything had to be created from scratch. The further challenge with this is there wasn't event a sketch or mockup of how the final app would look so it really was like starting with a blank canvas and that was daunting and intimidating at first.

Working with styling and CSS in particular required hours of trial and error.

## Key learnings

The key learnings I derived from this project were manifold. Here are some off the top of my head:

*  **Going through that whole planning approach detailed in Part 3 Lesson 7: Real World Redux** - as mentioned above this Project started off with a blank canvas so it was much more challenging. Where to even begin? How to best tackle this? So I followed the following 4-step approach: (1) Identify What Each View Should Look Like (2) Break Each View Into a Hierarchy of Components (3) Determine What Events Happen in the App (4) Determine What Data Lives in the Store. So I methodically followed those steps and drew paper mock-ups as well as planned out the components and what data should live where. This proved to be a good exercise on how to even approach and tackle such a problem which seemed overwhelming at first. It started with an intangible idea and bringing it to reality was a very rewarding experience.

*  **Separation of styling and functionality** - A handy approach was just to build out the UI shell first + setup React Router to the point it was feature complete before even beginning to touch styling.

*  **Redux** - working with reducers, actions, action creators, dispatch, mapStateToProps, mapStateToDispatch and so on. Not the most intuitive thing at first but it came in handy being able to just have a Global Store unlike in Project 1 where everything just lived in local component state and passing down props more than 2 layers down started to become a pain. Learnt the point about not being able to mutate the store directly. Instead each time the reducer that is responsible for that slice of the store ought to make a copy of it using the spread operator `...` and only then modifying that copy and returning that new version. Also experienced firsthand the difficulties of dealing with nested object updates and how confusing it was to go down the layers.

*  **Redux Dev Tools** - learnt how to use this browser extension that helped a lot with debugging and seeing the entire global application state in one place as well as a log of every single action dispatched that updated the state which makes for greater predictability which is the purpose of Redux in the first place.

*  **React Router** - lots more experience using React Router as more complicated routing was needed this time compared to Project 1. Learnt about how `this.props.match.params` is a handy feature that comes for free on your props and that is what helped me get the question id off of the URL directly. Furthermore `ownProps.location.pathname` came in very handy when trying to do redirects after a user action such as logging in. Location.pathname remembered the URL that was the point of entry so it was easy to redirect the user after they logged in.

*  **React Loading Bar** - good experience pulling in an external package and wiring it up into the app. You needed to get the UI in and then also import the relevant reducers and action creators which came bundled with the package. Could easily change the style of the loading bar by passing it different props.

*  **Styling** - a huge pain. Took many many hours to get the hang of. Many new concepts to grapple with. Block versus inline elements. Difference between margin and padding, divs and spans. Learnt about the new Flexbox model which lets you get some measure of mobile responsiveness "out-of-the-box". You have to set `display: flex` and `flex-direction: row/column`. Saw the difference between `justify-content` versus `align-items`. Created a progress bar with pure CSS just using divs. Then was able to make the percentage fill of that div be based on actual dynamic user data so that it mimics a real progress bar. Wrapped my head around two ways to do styling in React. (1) through className property (2) passing a JS object into the style property.

*  **Working with Bootstrap** - I found Bootstrap handy to get styles on the element level (e.g. a button, a navbar or a table - their tables are great!). But in terms of layout and overall styling and layout customization I had to add a lot of my own manual styles to get exactly what I wanted.

*  **Mobile Responsive Styles** - after spending hours on styling I got it all nice and dandy. I then looked at it on my mobile and it looked like utter crap. Of course,  that's when I remembered what it looks like in the browser on your laptop does not necessarily reflect how it will look like on the browser on your phone. This took a long time to remedy to some degree. Learnt about using breakpoints and `@media` queries. As mentioned above, using Flexbox also helped provide some degree of "responsiveness" out-of-the-box.

*  **Coding standards and Udacity style guides** - style guide for Git messages. Getting the hang of good practices. Reinforcing these best practices which I began in Project 1.

*  **PropTypes package** - good practice and helps in debugging given JavaScript is loosely typed this provides some guardrails. Continued using PropTypes as I did in Project 1 to help with any hard-to-trace bugs.

*  **Deploying to Firebase** - what's the point of doing all this "devving" if it only works on localhost on your local machine lol. Real devs got their stuff on Chrome/Firefox right? Good experience using a PaaS (Firebase this time) to deploy my app to share it with friends and family. This required different steps than Heroku in Project 1. But the good thing about Firebase is unlike Heroku I've found that it does not go to sleep after 30 minutes of inactivity even on the free tier which is awesome! Simply had to install Firebase Tools CLI, create a project in the Firebase Web Console. Create a productionized build of your app and then initializing a Firebase app and deploying that production-ready build straight from the CLI. Scarcely any config required.

## How to start the frontend React App

* Simply `git clone` the repo.

* On your machine terminal, `cd` into local directory you cloned the remote repo into.

* Simply enter `yarn` in your terminal to install all project dependencies.

* Start the development server with `yarn start`

  

## Backend


We were provided a mock backend API so we could only focus on the frontend.

[Here is the full backend spec](https://github.com/udacity/reactnd-project-would-you-rather-starter).

The provided file `_DATA.js` contained all the methods needed to interface with the backend. We simply had to call the relevant methods to make mock AJAX calls.
  

## Project Rubric/Spec Checklist

  

### Application Setup

- [x] The application requires only `yarn` and `yarn start` to install and launch.

- [x] A README is included with the project. The README includes a description and clear instructions for installing and launching the project.

  

### Login Flow

- [x] There should be a way for the user to impersonate/ log in as an existing user. (This could be as simple as having a login box that appears at the root of the application. The user could then select a name from the list of existing users.)

  

- [x] The application works correctly regardless of which user is selected.

- [x] The application allows the user to log out and log back in. The user should be logged in to submit new polling questions, vote, and view the leaderboard.

- [x] Once the user logs in, the home page is shown.

- [x] Whenever the user types something in the address bar, the user is asked to log in before the requested page is shown.

  

### Application Functionality

#### Homepage Functionality

- [x] The answered and unanswered polls are both available at the root.

- [x] The user can alternate between viewing answered and unanswered polls.

- [x] The unanswered questions are shown by default.

- [x] The name of the logged in user is visible on the page.

- [x] The user can navigate to the leaderboard.

- [x] The user can navigate to the form that allows the user to create a new poll.

#### Polling Question Functionality

- [x] Each polling question resides in the correct category. For example, if a question hasn’t been answered by the current user, it should be in the “Unanswered” category.

- [x] A polling question links to details of that poll.

- [x] The polls in both categories are arranged from the most recently created (top) to the least recently created (bottom).

- [x] The details of the poll are available at questions/:question_id.

- [x] When a poll is clicked on the home page, the following is shown:

	- [x] the text “Would You Rather”;

	- [x] the picture of the user who posted the polling question; and

	- [x] the two options.

- [x] For answered polls, each of the two options contains the following:

	- [x] the text of the option;

	- [x] the number of people who voted for that option;

	- [x] the percentage of people who voted for that option.

- [x] The option selected by the logged in user should be clearly marked.

- [x] When the user is logged in, the details of the poll are shown. If the user is logged out, he/she is asked to log in before before being able to access the poll.

- [x] The application asks the user to sign in and shows a 404 page if that poll does not exist. (Please keep in mind that new polls will not be accessible at their url because of the way the backend is set up in this application.)

- [x] Upon voting in a poll, all of the information of the answered poll is displayed.

- [x] The user’s response is recorded and is clearly visible on the poll details page.

- [x] When the user comes back to the home page, the polling question appears in the “Answered” column.

- [x] The voting mechanism works correctly, and the data on the leaderboard changes appropriately.

#### Adding A New Poll

- [x] The form is available at/add.

- [x] The application shows the text “Would You Rather” and has a form for creating two options.

- [x] Upon submitting the form, a new poll is created and the user is taken to the home page.

- [x] The new polling question appears in the correct category on the home page.

#### Leaderboard Functionality

- [x] The Leaderboard is available at/leaderboard.

- [x] Each entry on the leaderboard contains the following:

	- [x] the user’s name;

	- [x] the user’s picture;

	- [x] the number of questions the user asked; and

	- [x] the number of questions the user answered.

- [x] Users are ordered in descending order based on the sum of the number of questions they’ve answered and the number of questions they’ve asked.

#### App Navigation

- [x] The app contains a navigation bar that is visible on all of the pages.

- [x] The user can navigate between the page for creating new polls, and the leaderboard page, and the home page without typing the address into the address bar.

#### Backend Functionality

- [x] The data that’s initially displayed is populated correctly from the backend.

- [x] Each user’s answer and each new poll is correctly recorded on the backend.

### Architecture

#### Redux Store

- [x] The store is the application’s source of truth.

- [x] Components read the necessary state from the store; they do not have their own versions of the same state.

- [x] There are no direct API calls in the components' lifecycle methods.

#### Application State

- [x] Most application state is managed by the Redux store. State-based props are mapped from the store rather than stored as component state.

- [x] Form inputs and controlled components may have some state handled by the component.

#### Updating Store

- [x] Updates are triggered by dispatching action creators to reducers.

- [x] Reducers and actions are written properly and correctly return updated state to the store.

### Code Functionality

- [x] The code is structured and organized in a logical way.

- [x] Components are modular and reusable.

- [x] - [x] All code is formatted properly and is functional.

## Deployed demo version

As mentioned above what's the point of doing all this "devving" if it only works on localhost? Real devs got their stuff on Chrome/Firefox. That way you can share with friends and family!

[Here is the Firebase deployed version of my app.](https://reactnd-project2-game.firebaseapp.com/) As mentioned above I wanted to get a feel for another PaaS alternative to Heroku which is what I used in Project 1. The benefit to Firebase is unlike the Heroku free tier dynos which go to sleep after 30 minutes of inactivity. The Firebase hosted app is "always on".