import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import InternetCafes from "./components/internetCafes/index";
import React from 'react';
import './App.css';

function App() {
  return (
    <div className="App">
      <h1>React JS CRUD Operations</h1>
      <Router>
        <Routes>
          <Route path='/internetCafes' element={<InternetCafes />}></Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
