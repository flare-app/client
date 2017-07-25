import React, {Component} from 'react';

class SubmitButton extends Component {
	render() {
		if(this.props.loading) {
			return (
				<div
					className="btn btn-success full-width-button"
					style={{paddingTop: '12px'}}>
					<i className="fa fa-spinner fa-spin fa-3x fa-fw"/>
					<span className="sr-only">Loading...</span>
				</div>
			);
		} else {
			return (
				<input
					className="btn btn-success full-width-button"
					type="submit"
					value={this.props.label} />
			);
		}
	}
} export default SubmitButton;