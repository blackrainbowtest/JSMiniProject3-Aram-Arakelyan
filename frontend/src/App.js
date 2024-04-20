import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import Router from "../src/router/Router"
import './App.css';

function App() {
  return (
    <>
      <BrowserRouter>
        <Router />
      </BrowserRouter>
    </>
  );
}

export default App;