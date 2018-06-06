import React from 'react'
import { NavLink } from 'react-router-dom'

const Login = () => (
    <div className="login">
        <h1>Hi I am the Login</h1>
        <ul>
            <li>
            <NavLink to='/' exact activeClassName='active'>
                Login
            </NavLink>
            </li>
        </ul>
    </div>


   );

   export default Login;