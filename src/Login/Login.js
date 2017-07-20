import React, { Component } from 'react';
import icon from '../resources/app-icon.svg';

class Login extends Component {
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
						<div className="form-group row">
							<div className="col-12">
								<input className="form-control"
									   type="email"
									   placeholder="E-Mail"
									   required={true} />
							</div>
						</div>
						<div className="form-group row mb-4">
							<div className="col-12">
								<input className="form-control"
									   type="password"
									   placeholder="Passwort"
									   required={true} />
							</div>
						</div>
						<input className="btn btn-success full-width-button" type="submit" value="Login" />
					</form>
				</div>
			</div>
		);
	}
}
export default Login;
