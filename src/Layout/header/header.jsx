import React from 'react';
import { NavLink } from 'react-router-dom';

export const Header = ({ user }) => {
    return (
        <div className="header">
            HEADER

            <NavLink to="/" className="navigation" exact activeClassName="active-link">Home</NavLink>
            <NavLink to="/login" className="navigation" activeClassName="active-link">Login</NavLink>
            <NavLink to="/users" className="navigation" activeClassName="active-link">Users</NavLink>
            <NavLink to="/contact" className="navigation" activeClassName="active-link">Contacto</NavLink>

            <div className="userInfo">
                {user.name} {user.surname}
            </div>
        </div>
    )
}
