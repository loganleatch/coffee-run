import React from 'react';
import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import OfficeOrder from './components/OfficeOrder'
import Distribution from './components/Distribution'

function App() {
  return (
    <Router>
      <div>
        <Route path="/" exact component={OfficeOrder} />
        <Route path="/admin" component={Distribution} />
      </div>
    </Router>
  );
}

export default App;
