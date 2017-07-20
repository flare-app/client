import React, { Component } from 'react';
import icon from '../resources/app-icon.svg';

class Login extends Component {
	constructor() {
		super();
		this.constantGeolocation = this.constantGeolocation.bind(this);
		this.displayCurrentPosition = this.displayCurrentPosition.bind(this);
		this.state = {
			clicked: false,
			location: {
				latitude: 0,
				longitude: 0
			}
		}
	}

	sleep(ms) {
		return new Promise(resolve => setTimeout(resolve, ms));
	}

	displayCurrentPosition(position) {
		this.setState({
			clicked: true,
			location: position.coords
		});
	}

	async constantGeolocation() {
		navigator.geolocation.getCurrentPosition( this.displayCurrentPosition );
		await this.sleep(2000);
		this.constantGeolocation();
	}

	render() {
		return (
			<div className="d-flex flex-column justify-content-center vh-100">
				<div className="d-flex justify-content-center mb-5">
					<img src={icon} className="app-icon" alt="icon" />
				</div>
				<div className="d-flex justify-content-center">
					<form className="login-form">
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
								   required={true} />
						</div>
						<div className="form-group mb-4">
							<input className="form-control"
								   type="password"
								   placeholder="Passwort"
								   required={true} />
						</div>
						<input className="btn btn-success full-width-button" type="submit" value="Login" />
					</form>
				</div>
				<p></p>
				{!this.state.clicked &&
					<button type="button" className="btn btn-success" onClick={this.constantGeolocation}>
						Locate Me!
					</button>
				}
				{this.state.clicked &&
					<div>
						<p>I've got ya!</p>
						<p>lat: {this.state.location.latitude}</p>
						<p>lon: {this.state.location.longitude}</p>
					</div>
				}
			</div>
		);
	}
}
export default Login;
