import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import InternetCafes from "./components/internetCafes/index";
import React from 'react';
import './App.css';
import CreateInternetCafe from './components/internetCafes/create';
import EditInternetCafe from './components/internetCafes/edit';
import InfoInternetCafe from './components/internetCafes/info';
import Login from './components/authorization/login';

function App() {
  return (
    <div className="App">
      <h1>CafeGame</h1>
      <Router>
        <Routes>
          <Route path='/login' element={<Login />}></Route>
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
