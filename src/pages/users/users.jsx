import React, { Fragment, useState, useEffect } from 'react';
import axios from 'axios';
import { URL } from '../../config/api';
                // props: {
                //     token,
                // }
const Users = ({ token }) => {
    const [allUsers, setAllUsers] = useState([]);

    const handleGetUsers = () =>{
        axios.get(`${URL}/users`, {
          headers: {
            Authorization: token
          }
        })
          .then(response => {
            console.log(response.data);
            setAllUsers(response.data.users)
          })
          .catch(error => {
            console.log(error)
          })
      }
    
    useEffect(() => {
        handleGetUsers();
    }, [])

    return (
        <div>
            <h1>Users</h1>
            {
                allUsers.map(user => {
                return (
                    <Fragment key={user._id}>
                    <div >
                    <h2>
                        {user.name}, {user.surname}
                    </h2> 
                    <span className="user-email">
                        {user.email}
                    </span>
                    {/* <a href="#" onClick={() => handleGetUserData(user._id)}> Ver más </a> */}
                    </div>
                    </Fragment>
                )
                })
            }
        </div>
    )
}

export default Users
