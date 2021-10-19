import React, { useState, useEffect, Fragment } from 'react';
import './App.css';
import axios from 'axios';
import { Header } from './Layout/header/header';
import Footer from './Layout/footer/footer';

const URL = 'http://localhost:3200/api';

const imageURL = 'http://localhost:3200/uploads/user-avatar/';

let token = "eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJhdmF0YXIiOiJkZWZhdWx0LnBuZyIsImFjdGl2ZSI6dHJ1ZSwiX2lkIjoiNjE1Y2RhNmQyYWFhMDg4NTliMTlmMzc5IiwiZW1haWwiOiJlbXBsb3llZUBzcnYuY29tIiwibmFtZSI6IkVtcGxveWVlIiwic3VybmFtZSI6IkJhY2tlbmQiLCJkaXIiOiJJcmVuZSBDdXJpZSIsImRpcl9udW0iOjEyMzQsInJvbGUiOiJVU0VSX1JPTEUiLCJfX3YiOjAsImlhdCI6MTYzNDI1NjU4NywiZXhwIjoxNjM0MjYwMTg3fQ.eXkSowrGe1reWJzcz-UElrxvwEzAzHQQBoZtV4MxwKrwi__fDB_FwA1cERZnXF_UXkc2VPPSYADeR9tpXeLEiw";

function App() {
  const [allUsers, setAllUsers] = useState([]);

  const [user, setUser] = useState({});

	const login = () => {
      console.log("Login llamado");	
      return axios.post(`${URL}/login`, { email: 'employee@srv.com', password: '1234'})
        .then(response => {
          return response.data.token;
        }).catch(error => {
          return error
        })
  }

  const handleGetUsers = (token) =>{
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


  // Buscar información personal de un usuario
  const handleGetUserData = async (id) =>{
    try {
      console.log(id);
      const userDB = await axios.get(`${URL}/user/${id}`, {
        headers: {
          'Authorization': token
        }
      });
      console.log(userDB.data.user.email);
      setUser(userDB.data.user);

    } catch (error) {
      console.log(error);
    }
  }


  useEffect(() => {
    async function loginAndGetData() {
      token = await login();
      console.log('Token recibido:', token);
      handleGetUsers(token)
    }
    loginAndGetData();
  }, [])

  return (
    <>
      <Header></Header>
      
      <div className="flex">
        <div>
        <h1>Account Balance</h1>
      {
        allUsers.map(user => {
          return (
            <Fragment key={user._id}>
             <div >
              <img src={imageURL + user.avatar} alt=""/>
              <h2>
                {user.name}, {user.surname}
              </h2> 
              <span className="user-email">
                {user.email}
              </span>
              <a href="#" onClick={() => handleGetUserData(user._id)}> Ver más </a>
             </div>
            </Fragment>
          )
        })
      }
        </div>
        <div>
          <h1>User Info</h1>
          <ul>
            <li>{user.name}, {user.surname}</li>
            <li>{user.email}</li>
          </ul>
        </div>
      </div>
      <Footer></Footer>
    </>
  );
}

export default App;
