import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import InternetCafes from "./components/internetCafes/index";
import React, { useEffect } from 'react';
import './App.css';
import CreateInternetCafe from './components/internetCafes/create';
import EditInternetCafe from './components/internetCafes/edit';
import InfoInternetCafe from './components/internetCafes/info';
import Login from './components/authentication/login';
import Register2 from './components/authentication/register2';
import Register from './components/authentication/register';
import Header from './components/header';


function App() {
  useEffect(() => {
    if (!localStorage.getItem('isLoggedIn')) {
      localStorage.setItem('isLoggedIn', 'false');
    }
    if (!localStorage.getItem('role')) {
      localStorage.setItem('role', 'guest');
    }
    if (!localStorage.getItem('accessToken')) {
      localStorage.setItem('accessToken', 'empty');
    }
    if (!localStorage.getItem('refreshToken')) {
      localStorage.setItem('refreshToken', 'empty');
    }
  }, []);

  return (
    <div className="App">
      <Router>
        <Header/>
        <div style={{ height: '40px' }}/>
        <Routes>
          <Route path='/login' element={<Login />}></Route>
          <Route path='/register' element={<Register />}></Route>
          <Route path='/register2' element={<Register2 />}></Route>
          <Route path='/internetCafes' element={<InternetCafes />}></Route>
          <Route path='/internetCafes/info/:internetCafeId' element={<InfoInternetCafe />}></Route>
          <Route path='/internetCafes/create' element={<CreateInternetCafe></CreateInternetCafe>}></Route>
          <Route path='/internetCafes/edit/:internetCafeId' element={<EditInternetCafe></EditInternetCafe>}></Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
