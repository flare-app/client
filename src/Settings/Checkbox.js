import React, { Component } from 'react';

class Checkbox extends Component {
	constructor() {
		super();
		this.state = {
			checked: false
		};
		this.check = this.check.bind(this);
		this.uncheck = this.uncheck.bind(this);
	}

	check() {
		this.setState({
			checked: true
		});
		this.props.onCheck();
	}

	uncheck() {
		this.setState({
			checked: false
		});
		this.props.onUncheck();
	}

	render() {
		if (this.state.checked) {
			return(
				<button
					type="button"
					className="btn btn-success"
					onClick={this.uncheck}>
					{this.props.children}
				</button>
			);
		}
		else {
			return(
				<button
					type="button"
					className="btn btn-outline-success"
					onClick={this.check}>
					{this.props.children}
				</button>
			);
		}
	}
}

export default Checkbox;
