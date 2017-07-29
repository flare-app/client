import React, {Component} from 'react';
import icon from '../resources/app-icon.svg';

class Response extends Component {
	
	constructor(props) {
		super(props);
		this.handleSubmitResponse = this.handleSubmitResponse.bind(this);
		this.handleSubmitMistake = this.handleSubmitMistake.bind(this);
		this.state = {dataSent: false};
	}

	handleSubmitMistake() {
		if ('serviceWorker' in navigator) {
			const response = {
				authToken: this.props.authToken,
			};
			this.sendData('mistake', response);
			this.setState({dataSent: false});
		}
	}

	handleSubmitResponse(willAppear, transportation) {
		if ('serviceWorker' in navigator) {
			const response = {
				willAppear: willAppear,
				transportation: transportation,
				authToken: this.props.authToken,
				geoLocation: window.localStorage.geoLocation
			};
			this.sendData('response', response);
			navigator.geolocation.getCurrentPosition(function (position) {
				const crd = position.coords;
				response.geolocation = {lat: crd.latitude, long: crd.longitude};
				this.sendData('response', response);
			}.bind(this));
			this.setState({dataSent: true});
		}
	}
	
	sendData(type, response) {
		navigator.serviceWorker.ready.then(function() {
			navigator.serviceWorker.controller.postMessage({type: type, response: response});
		});
	}

	render() {
		return (
			<div className="d-flex flex-column justify-content-center vh-100">
				<div className="d-flex justify-content-center mb-5">
					<img src={icon} className="app-icon" alt="icon"/>
				</div>
				{!this.state.dataSent &&
					<div>
						<div className="d-flex justify-content-center mb-5">
							<div className="btn-group btn-group-lg" role="group">
								<button
									type="button" className="btn btn-success"
									onClick={this.handleSubmitResponse.bind(this, true, 'walk')}>
									<i className="fa fa-blind fa-walk"/>
								</button>
								<button
									type="button" className="btn btn-success"
									onClick={this.handleSubmitResponse.bind(this, true, 'bike')}>
									<i className="fa fa-bicycle"/>
								</button>
								<button
									type="button" className="btn btn-success"
									onClick={this.handleSubmitResponse.bind(this, true, 'car')}>
									<i className="fa fa-car"/>
								</button>
								<button
									type="button" className="btn btn-success"
									onClick={this.handleSubmitResponse.bind(this, true, 'publicTransport')}>
									<i className="fa fa-bus"/>
								</button>
							</div>
						</div>
						<div className="d-flex justify-content-center mb-5">
							<div className="btn-group btn-group-lg" role="group">
								<button
									type="button" className="btn btn-danger"
									onClick={this.handleSubmitResponse.bind(this, false, 'none')}>
									<i className="no-icon fa fa-times"/>
								</button>
							</div>
						</div>
					</div>
				}
				{this.state.dataSent &&
					<div className="d-flex justify-content-center mb-5">
						<div className="btn-group btn-group-lg" role="group">
							<button
								type="button" className="btn btn-warning"
								onClick={this.handleSubmitMistake}>
								Ooops
							</button>
						</div>
					</div>
				}
			</div>
		);
	}
}
export default Response;
