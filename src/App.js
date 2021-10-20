import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import './App.css';
import axios from 'axios';
import { Header } from './Layout/header/header';
import Footer from './Layout/footer/footer';
import Home from './pages/home/home'
import Login from './pages/login/login';
import Users from './pages/users/users';
import Contact from './pages/contact/contact';
import { URL } from './config/api';

function App() {
  
  const [token, setToken] = useState(null)
  const [user, setUser] = useState({});

	const login = () => {
    return axios.post(`${URL}/login`, { email: 'employee@srv.com', password: '1234'})
      .then((response) => {
        return response.data;
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
    console.log('Llamado al useEffect')
    if(!token) {
      async function loginToken() {
        let loginResponse = await login();
        console.log(loginResponse)
        setToken(loginResponse.token);
        setUser(loginResponse.user)
      }
      loginToken();
    }
    
    // handleGetUsers(token)
    // async function loginAndGetData() {
    //   // token = await login();
    //   console.log('Token recibido:', token);
    //   handleGetUsers(token)
    // }
    
  }, [token])

  return (
    <Router>
      <Header user={user}></Header>
      <main className="main-container"> 
        <h1>Account Balance</h1>
        

        <Switch>
          <Route path="/" exact component={Home}></Route>
          <Route path="/login" component={Login}></Route>
          <Route path="/users">
            <Users token={token} />
          </Route>
          <Route path="/contact">
            <Contact />
          </Route>
          
        </Switch>
      </main>
      
      {/* <div className="flex">
        <div>
        
      
        </div>
        <div>
          <h1>User Info</h1>
          <ul>
            <li>{user.name}, {user.surname}</li>
            <li>{user.email}</li>
          </ul>
        </div>
      </div> */}
      <Footer></Footer>
    </Router>
  );
}

export default App;
