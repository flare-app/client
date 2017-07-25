import React, { Component } from 'react';
import icon from '../resources/app-icon.svg';
import POSTHandler from '../ConnectionComponent/POSTHandler.js'
import SubmitButton from '../Utils/SubmitButton.js';

class Login extends Component {

	constructor() {
		super();
		this.state = {
			serverError: {occurred: false, message: ''},
			password: '',
			secondPassword: '',
			loading: false
		};
		this.onSubmitPasswordChange = this.onSubmitPasswordChange.bind(this);
		this.handlePasswordChange = this.handlePasswordChange.bind(this);
		this.handleSecondPasswordChange = this.handleSecondPasswordChange.bind(this);
		this.handleServerError = this.handleServerError.bind(this);
	}

	handlePasswordChange(event) {
		this.setState({password: event.target.value});
	}

	handleSecondPasswordChange(event) {
		this.setState({secondPassword: event.target.value});
	}

	handleServerError(type, message) {
		this.setState(
			{serverError: {
				occurred: true,
				type: type,
				message: message,
			},
			loading: false,
			});
	}

	onSubmitPasswordChange(event) {
		event.preventDefault();
		if(this.state.password === this.state.secondPassword) {
			const postData = {
				password: this.state.password,
				authentication: window.localStorage.authToken,
			};
			POSTHandler.performPOSTRequest('user/resetPassword', postData, this.handleServerError, (response) => {
				window.localStorage.setItem('authToken', response.authenticationToken);
				if(response.authenticationToken) {
					this.props.passwordChangeRequired(false);
					this.props.userLogedIn(true);
				}
			});
		} else {
			this.handleServerError('Password error', 'Passwords are not equal!')
		}
		this.setState({loading: true});
	}

	render() {
		return (
			<div className="d-flex flex-column justify-content-center vh-100">
				<div className="d-flex justify-content-center mb-5">
					<img src={icon} className="app-icon" alt="icon" />
				</div>
				<div className="d-flex justify-content-center">
					<form className="login-form" onSubmit={this.onSubmitPasswordChange}>
						{this.state.serverError.occurred &&
						<div className="alert alert-danger" role="alert">
							<strong>{this.state.serverError.type}: </strong> {this.state.serverError.message}
						</div>
						}
						<div className="form-group">
							<input className="form-control"
								   type="password"
								   placeholder="Passwort"
								   required={true}
								   onChange={this.handlePasswordChange}
								   value={this.state.password}/>
						</div>
						<div className="form-group mb-4">
							<input className="form-control"
								   type="password"
								   placeholder="Passwort (Wiederholung)"
								   onChange={this.handleSecondPasswordChange}
								   required={true}
								   value={this.state.secondPassword} />
						</div>
						<SubmitButton
							lable="Passwort ändern"
							loading={this.state.loading} />
					</form>
				</div>
			</div>
		);
	}
}
export default Login;