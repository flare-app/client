import React, { Component } from 'react';
import icon from '../resources/app-icon.svg';
import POSTHandler from '../ConnectionComponent/POSTHandler.js'
import GETHandler from '../ConnectionComponent/GETHandler.js';
import SubmitButton from '../Utils/SubmitButton.js';

class Login extends Component {
	
	constructor() {
		super();
		this.state = {
			email: '',
			password: '',
			unitName: '',
			unitCity: '',
			serverError: {occurred: false, message: ''},
			cities: [],
			units: []
		};
		this.handleSubmitLogin = this.handleSubmitLogin.bind(this);
		this.handlePasswordChange = this.handlePasswordChange.bind(this);
		this.handleEmailChange = this.handleEmailChange.bind(this);
		this.handleServerError = this.handleServerError.bind(this);
		this.handleCityChange = this.handleCityChange.bind(this);
		this.handleUnitChange = this.handleUnitChange.bind(this);
		this.getCities = this.getCities.bind(this);
	}
	
	handlePasswordChange(event) {
		this.setState({password: event.target.value});
	}
	
	handleEmailChange(event) {
		this.setState({email: event.target.value});
	}
	
	handleServerError(type, message) {
		this.setState(
			{serverError: {
				occurred: true, 
				type: type,
				message: message,
			}
		});
	}
	
	handleCityChange(event) {
		this.setState({unitCity: event.target.value});
		this.getUnits(event.target.value);
	}
	
	handleUnitChange(event) {
		this.setState({unitName: event.target.value});
	}
	
	onSubmitLogin(event) {
		event.preventDefault();
		const postData = {
			email: this.state.email,
			password: this.state.password,
			unitName: this.state.unitName,
			unitCity: this.state.unitCity
		};
		POSTHandler.performPOSTRequest('login', postData, this.handleServerError, (response) => {
			window.localStorage.setItem('authToken', response.authenticationToken);
			if(response.passwordExpires) {
				this.props.passwordChangeRequired(true);
			} else {
				this.props.onSuccessfulLogin();
			}
		});
	}
	
	getCities() {
		GETHandler.performGetRequest('cities', this.handleServerError, (response) => {
			this.setState({cities: response});
		});
	}
	
	getUnits(city) {
		GETHandler.performGetRequest('units/' + city, this.handleServerError, (response) => {
			this.setState({units: response});
		});
	}
	
	componentDidMount() {
		this.getCities();
	}

	render() {
		return (
			<div className="d-flex flex-column justify-content-center vh-100">
				<div className="d-flex justify-content-center mb-5">
					<img src={icon} className="app-icon" alt="icon" />
				</div>
				<div className="d-flex justify-content-center">
					<form className="login-form" onSubmit={this.onSubmitLogin}>
						{this.state.serverError.occurred &&
							<div className="alert alert-danger" role="alert">
								<strong>{this.state.serverError.type}: </strong> {this.state.serverError.message}
							</div>
						}
						<div className="form-group">
							<select className="form-control" required={true} 
									defaultValue={""} value={this.state.value} 
									onChange={this.handleCityChange}>
								<option value="" disabled>Wähle die Stadt deiner Feuerwehr</option>
								{this.state.cities.forEach((city) => {
									return (<option value={city}>{city}</option>);
								})}
							</select>
						</div>
						<div className="form-group">
							<select className="form-control" required={true} 
									defaultValue={""} 
									value={this.state.value} 
									onChange={this.handleUnitChange}>
								<option value="" disabled>Wähle deine Einheit</option>
								{this.state.cities.forEach((unit) => {
									return (<option value={unit}>{unit}</option>);
								})}
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
						<SubmitButton
							lable="Login" 
							loading={this.state.loading} />
					</form>
				</div>
			</div>
		);
	}
}
export default Login;