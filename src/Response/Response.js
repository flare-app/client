import React, {Component} from 'react';
import icon from '../resources/app-icon.svg';

class Response extends Component {
	
	onSubmitResponse(willAppear, transportation) {
		if ('serviceWorker' in navigator) {
			const response = {
				willAppear: willAppear,
				transportation: transportation
			};
			navigator.serviceWorker.ready.then(function() {
				navigator.serviceWorker.controller.postMessage({type: 'response', response: response});
			});
		}
	}

	render() {
		return (
			<div className="d-flex flex-column justify-content-center vh-100">
				<div className="d-flex justify-content-center mb-5">
					<img src={icon} className="app-icon" alt="icon"/>
				</div>
				<div className="d-flex justify-content-center mb-5">
					<div className="btn-group btn-group-lg" role="group">
						<button 
							type="button" className="btn btn-success" 
							onClick={this.onSubmitResponse.bind(this, true, 'walk')}>
							<i className="fa fa-blind fa-walk"/>
						</button>
						<button 
							type="button" className="btn btn-success"
							onClick={this.onSubmitResponse.bind(this, true, 'bike')}>
							<i className="fa fa-bicycle"/>
						</button>
						<button 
							type="button" className="btn btn-success"
							onClick={this.onSubmitResponse.bind(this, true, 'car')}>
							<i className="fa fa-car"/>
						</button>
						<button 
							type="button" className="btn btn-success"
							onClick={this.onSubmitResponse.bind(this, true, 'publicTransport')}>
							<i className="fa fa-bus"/>
						</button>
					</div>
				</div>
				<div className="d-flex justify-content-center mb-5">
					<div className="btn-group btn-group-lg" role="group">
						<button 
							type="button" className="btn btn-danger"
							onClick={this.onSubmitResponse.bind(this, false, 'none')}>
							<i className="no-icon fa fa-times"/>
						</button>
					</div>
				</div>
			</div>
		);
	}
}
export default Response;
