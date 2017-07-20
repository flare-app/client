import React, { Component } from 'react';
import Checkbox from './Checkbox';
import config from './../config/config';
const MD5 = require("crypto-js/md5");


class Settings extends Component {
	constructor() {
		super();
		this.state = {
			user: {
				email: 'christian@friedow.com',
				avatarUrl: ''
			}
		};
		this.transportationModeIsFavorite = this.transportationModeIsFavorite.bind(this);
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

	static getFavoriteTransportationModes() {
		const modes = JSON.parse(window.localStorage.getItem('favoriteTransportationModes'));
		if (modes) {
			return modes;
		}
		else {
			return [];
		}
	}
	static setFavoriteTransportationModes(modes) {
		const modesJson = JSON.stringify(modes);
		window.localStorage.setItem('favoriteTransportationModes', modesJson);
	}

	transportationModeIsFavorite(transportationMode) {
		const modes = Settings.getFavoriteTransportationModes();
		return modes.findIndex(i => i.name === transportationMode.name) >= 0;
	}

	handleCheckTransportationMode( transportationMode ) {
		let modes = Settings.getFavoriteTransportationModes();
		if (!this.transportationModeIsFavorite(transportationMode)) {
			modes.push(transportationMode);
		}
		Settings.setFavoriteTransportationModes(modes);
	}

	handleUncheckTransportationMode( transportationMode ) {
		let modes = Settings.getFavoriteTransportationModes();
		console.log(transportationMode);
		console.log(modes);
		if (this.transportationModeIsFavorite(transportationMode)) {
			const i = modes.findIndex(i => i.name === transportationMode.name);
			if(i >= -1) {
				modes.splice(i, 1);
			}
		}
		Settings.setFavoriteTransportationModes(modes);
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

						<div className="btn-group btn-group-lg mb-5" role="group">
							{config.transportationModes.map((transportationMode) => {
								return(
									<Checkbox
										default={ this.transportationModeIsFavorite(transportationMode) }
										onCheck={ () => { this.handleCheckTransportationMode(transportationMode) } }
										onUncheck={ () => { this.handleUncheckTransportationMode(transportationMode) } }>
										<i className={`fa ${transportationMode.icon}`}/>
									</Checkbox>
								);
							})}
						</div>

						<button type="button" className="btn btn-danger">
							Logout
						</button>
					</div>
				</div>
				<div className="d-flex justify-content-center mb-5">

				</div>
			</div>
		);
	}
}

export default Settings;
