import React, { Component } from 'react'

class Leaderboard extends Component {


    render() {
        return (
            <div className="leaderboard">
                <h1>Hi I am the Leaderboard</h1>
            </div>
        );
    }
};


/* exporting a connected component not merely a component so that in App.js you can use that
   cos realise that the connect function takes in a component and returns a brand new component
   that React can render
*/
export default Leaderboard;