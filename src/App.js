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
		this.changeLoginState = this.changeLoginState.bind(this);
		if ('serviceWorker' in navigator) {
			const swUrl = `${process.env.PUBLIC_URL}/bgSyncServiceWorker.js`;
			navigator.serviceWorker.register(swUrl, {scope: '/'}).then(function(registration) {
				console.log('ServiceWorker registration successful with scope: ', registration.scope);
				return navigator.serviceWorker.ready;
			}, function(err) {
				console.log('ServiceWorker registration failed: ', err);
			});
		}
		this.state = {
			authToken: window.localStorage.authToken,
			isLoggedIn: !!window.localStorage.authToken
		};
	}
	
	changeLoginState() {
		this.setState({isLoggedIn: !this.state.isLoggedIn});
	}
	
	render() {
		return (
			<div className="container-fluid">
				{!this.state.isLoggedIn && <Login onSuccessfulLogin={this.changeLoginState}/>}
				{!this.state.isLoggedIn && <Response authToken={this.state.authToken}/>}
			</div>
		);
	}
}
export default App;