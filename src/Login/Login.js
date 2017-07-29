import React, { Component } from 'react';
import icon from '../resources/app-icon.svg';

class Login extends Component {
	
	constructor() {
		super();
		this.state = {
			email: '',
			password: ''
		};
		this.handleSubmitLogin = this.handleSubmitLogin.bind(this);
		this.handlePasswordChange = this.handlePasswordChange.bind(this);
		this.handleEmailChange = this.handleEmailChange.bind(this);
	}
	
	handlePasswordChange(event) {
		this.setState({password: event.target.value});
	}
	
	handleEmailChange(event) {
		this.setState({email: event.target.value});
	}

	handleSubmitLogin(event) {
		event.preventDefault();
	}

	render() {
		return (
			<div className="d-flex flex-column justify-content-center vh-100">
				<div className="d-flex justify-content-center mb-5">
					<img src={icon} className="app-icon" alt="icon" />
				</div>
				<div className="d-flex justify-content-center">
					<form className="login-form" onSubmit={this.handleSubmitLogin}>
						<div className="form-group">
							<select className="form-control" required={true} defaultValue={""}>
								<option value="" disabled>Wähle die Stadt deiner Feuerwehr</option>
								<option value="potsdam">Potsdam</option>
							</select>
						</div>
						<div className="form-group">
							<select className="form-control" required={true} defaultValue={""}>
								<option value="" disabled>Wähle deine Einheit</option>
								<option value="zentrum">Zentrum</option>
							</select>
						</div>
						<div className="form-group">
							<input className="form-control"
								   type="email"
								   placeholder="E-Mail"
								   required={true}
								   onChange={this.handleEmailChange}
								   value={this.state.email}/>
						</div>
						<div className="form-group mb-4">
							<input className="form-control"
								   type="password"
								   placeholder="Passwort"
								   onChange={this.handlePasswordChange}
								   required={true}
								   value={this.state.password} />
						</div>
						<input
							className="btn btn-success full-width-button"
							type="submit"
							value="Login"/>
					</form>
				</div>
			</div>
		);
	}
}
export default Login;
