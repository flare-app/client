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
			navigator.serviceWorker.register('/bgSyncServiceWorker.js', {
				scope: '/'
			})
			.catch(function(error) {
				console.log("ServiceWorker Registration failed: " + error);
			});
			navigator.serviceWorker.ready.then(function(reg) {
				return reg.sync.register('tag-name');
			}).catch(function(error) {
				console.log(error);
				// system was unable to register for a sync,
				// this could be an OS-level restriction
			});
		} else {
			// serviceworker/sync not supported
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
