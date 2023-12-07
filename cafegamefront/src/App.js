import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import InternetCafes from "./components/internetCafes/index";
import React from 'react';
import './App.css';
import CreateInternetCafe from './components/internetCafes/create';
import EditInternetCafe from './components/internetCafes/edit';

function App() {
  return (
    <div className="App">
      <h1>React JS CRUD Operations</h1>
      <Router>
        <Routes>
          <Route path='/internetCafes' element={<InternetCafes />}></Route>
          <Route path='/internetCafes/create' element={<CreateInternetCafe></CreateInternetCafe>}></Route>
          <Route path='/internetCafes/edit:internetcafeid' element={<EditInternetCafe></EditInternetCafe>}></Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
