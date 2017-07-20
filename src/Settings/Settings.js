import React, { Component } from 'react';
import Checkbox from './Checkbox';
var MD5 = require("crypto-js/md5");

class Settings extends Component {
	constructor() {
		super();
		this.state = {
			user: {
				email: 'christian@friedow.com',
				avatarUrl: ''
			}
		};
		this.handleCheckTransportationMode = this.handleCheckTransportationMode.bind(this);
		this.handleUncheckTransportationMode = this.handleUncheckTransportationMode.bind(this);
	}

	componentDidMount() {
		this.calculateEmailHash();
	}

	calculateEmailHash() {
		const emailHash = MD5( this.state.user.email.trim().toLowerCase() ).toString();
		const avatarUrl = 'https://www.gravatar.com/avatar/' + emailHash;
		this.setState({
			user: {
				avatarUrl: avatarUrl
			}
		})
	}

	handleCheckTransportationMode( transportationMode ) {

	}

	handleUncheckTransportationMode( transportationMode ) {

	}

	render() {
		return (
			<div className="d-flex flex-column justify-content-center vh-100">
				<div className="d-flex justify-content-center mb-5">
					<img src={this.state.user.avatarUrl} className="avatar" alt="avatar" />
				</div>
				<div className="d-flex justify-content-center mb-5">
					<div className="w400">

						<h1>Home Address</h1>
						<span>Teststrasse 1</span><br/>
						<span>11111 Testort</span><br/>

						<h1>Favorite Transportation Modes</h1>

						<div className="btn-group btn-group-lg" role="group">
							<Checkbox
								onCheck={ () => { this.handleCheckTransportationMode('foot') } }
								onUncheck={ () => { this.handleUncheckTransportationMode('foot') } }>
								<i className="fa fa-blind"/>
							</Checkbox>
							<Checkbox
								onCheck={ () => { this.handleCheckTransportationMode('bike') } }
								onUncheck={ () => { this.handleUncheckTransportationMode('bike') } }>
								<i className="fa fa-bicycle"/>
							</Checkbox>
							<Checkbox
								onCheck={ () => { this.handleCheckTransportationMode('car') } }
								onUncheck={ () => { this.handleUncheckTransportationMode('car') } }>
								<i className="fa fa-car"/>
							</Checkbox>
							<Checkbox
								onCheck={ () => { this.handleCheckTransportationMode('bus') } }
								onUncheck={ () => { this.handleUncheckTransportationMode('bus') } }>
								<i className="fa fa-bus"/>
							</Checkbox>
						</div>


						Home GPS
						Favorite Transportation mode
						Logout
					</div>
				</div>
				<div className="d-flex justify-content-center mb-5">

				</div>
			</div>
		);
	}
}

export default Settings;
