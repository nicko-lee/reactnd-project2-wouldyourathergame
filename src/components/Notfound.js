import React from 'react'
import { NavLink } from 'react-router-dom'



const container = {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center'
}

const container2 = {
    backgroundColor: '#f8f9fa',
    padding: '3em 4em',
    marginTop: '3em',
    justifyContent: 'space-evenly',
    height: '20em'
}


const element = {
    marginBottom: '15px'
}

const Notfound = () => (
    <div className="container" style={container}>
                <div className="error-template" style={container2}>
                    <h1 style={element}>Oops!</h1>
                    <h2 style={element}>404 Not Found</h2>
                    <p style={element}>Sorry, an error has occured. Requested page not found!</p>
                    <NavLink className="btn btn-primary btn-md" to='/' exact activeClassName='active'>
                        Take Me Home
                    </NavLink>
                </div>

    </div>
   );

   export default Notfound;