import React, { Component } from 'react';
import Response from './Response/Response';
import './App.css';

global.jQuery = require('jquery');
global.Tether = require('tether');
require('bootstrap');
require('bootstrap/dist/css/bootstrap.css');
require('font-awesome/css/font-awesome.min.css');

class App extends Component {
  render() {
    return (
        <div className="container-fluid">
            <Response/>
        </div>
    );
  }
}

export default App;
