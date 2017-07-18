import React, { Component } from 'react';
import './App.css';
global.jQuery = require('jquery');
global.Tether = require('tether');
require('bootstrap');
require('bootstrap/dist/css/bootstrap.css');

class App extends Component {
  render() {
    return (
        <div className="container-fluid">
            <h1>Welcome</h1>
        </div>
    );
  }
}

export default App;
