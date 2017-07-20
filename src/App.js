import React, {Component} from 'react';
import './App.css';
import Login from './Login/Login.js';
import Response from './Response/Response.js';
global.jQuery = require('jquery');
global.Tether = require('tether');
require('bootstrap');
require('bootstrap/dist/css/bootstrap.css');
require('font-awesome/css/font-awesome.min.css');

class App extends Component {
	
	constructor(props) {
		super(props);
		this.state = {
			authToken: window.localStorage.authToken,
			isLoggedIn: !!window.localStorage.authToken
		};
	}
	
	componentDidMount() {
		if ('serviceWorker' in navigator && 'SyncManager' in window) {
			const swUrl = `${process.env.PUBLIC_URL}/bgSyncServiceWorker.js`;
			navigator.serviceWorker.register(swUrl, {
				scope: '/'
			})
			.catch(function(error) {
				console.log("ServiceWorker Registration failed: " + error);
			});
		}
	}
	
	render() {
		return (
			<div className="container-fluid">
				{!this.state.isLoggedIn && <Login/>}
				{this.state.isLoggedIn && <Response/>}
			</div>
		);
	}
}
export default App;