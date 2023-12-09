import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import InternetCafes from "./components/internetCafes/index";
import React, { useEffect } from 'react';
import './App.css';
import CreateInternetCafe from './components/internetCafes/create';
import EditInternetCafe from './components/internetCafes/edit';
import Login from './components/authentication/login';
import Register2 from './components/authentication/register2';
import Register from './components/authentication/register';
import Header from './components/header';
import InternetCafesList from './components/internetCafes/userIndex';
import ComputersList from './components/computers/userIndex';
import CreateComputer from './components/computers/create';
import Computers from './components/computers';
import EditComputer from './components/computers/edit';
import Reservations from './components/reservations';
import EditReservation from './components/reservations/edit';
import CreateReservation from './components/reservations/create';
import UserReservations from './components/reservations/userReservations';

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
          <Route path='/user/reservations' element={<UserReservations />}></Route>
          <Route path='/register2' element={<Register2 />}></Route>
          <Route path='/internetCafes' element={<InternetCafesList />}></Route>
          <Route path='/internetCafes/:internetCafeId/computers' element={<ComputersList/>}></Route>
          <Route path='/admin/internetCafes' element={<InternetCafes />}></Route>
          <Route path='/admin/internetCafes/create' element={<CreateInternetCafe/>}></Route>
          <Route path='/admin/internetCafes/edit/:internetCafeId' element={<EditInternetCafe/>}></Route>
          <Route path='/admin/internetCafes/:internetCafeId/computers' element={<Computers/>}></Route>
          <Route path='/admin/internetCafes/:internetCafeId/computers/create' element={<CreateComputer/>}></Route>
          <Route path='/admin/internetCafes/:internetCafeId/computers/edit/:computerId' element={<EditComputer/>}></Route>
          <Route path='/admin/internetCafes/:internetCafeId/computers/:computerId/reservations' element={<Reservations/>}></Route>
          <Route path='/admin/internetCafes/:internetCafeId/computers/:computerId/reservations/create' element={<CreateReservation/>}></Route>
          <Route path='/admin/internetCafes/:internetCafeId/computers/:computerId/reservations/edit/:reservationId' element={<EditReservation/>}></Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
