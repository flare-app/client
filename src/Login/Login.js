import React, { Component } from 'react';

class Login extends Component {
	render() {
		return (
			<div className="row align-items-center vh-100">
				<div className="col-10 col-sm-8 col-md-6 offset-md-3 offset-sm-2 offset-1 d-flex">
					<div className="card" style={{width: 100 + "%"}}>
						<div className="card-header">
							Login
						</div>
						<div className="card-block">
							<p className="card-text">Bitte authentifizieren Sie sich.</p>
							<form>
							<div className="form-group row">
								<div className="col-12">
									<input className="form-control" 
										   type="email"  
										   placeholder="E-Mail" 
										   required={true} />
								</div>
							</div>
							<div className="form-group row">
								<div className="col-12">
									<input className="form-control" 
										   type="password" 
										   placeholder="Passwort"
										   required={true}
									/>
								</div>
							</div>
							<input className="btn btn-primary" type="submit" value="Login" />
							</form>
						</div>
					</div>
				</div>
			</div>
		);
	}
}
export default Login;
