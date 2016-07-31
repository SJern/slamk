import React from 'react';
import Select from 'react-select';

const SelectionActions = require('../actions/selection_actions');
const UserApiUtil = require('../util/user_api_util');

var MultiSelectField = React.createClass({
	getInitialState () {
		return {
			options: [],
			value: [],
		};
	},

	componentDidMount() {
		UserApiUtil.fetchAllUsers(this.setOptions);
	},

	setOptions(users) {
		const options = users.map(user => {
			return { label: user.username, value: user.id };
		});
		this.setState({options: options});
	},

	handleSelectChange (value) {
		let ids;
		if (value) {
			ids = value.split(',').map(id => parseInt(id));
		} else {
			ids = [];
		}
		SelectionActions.setSelections(ids);
		this.setState({ value: ids });
	},

	render () {
		return (
			<Select multi simpleValue value={this.state.value} placeholder="Add one or more user(s) to the room" options={this.state.options} onChange={this.handleSelectChange} />
		);
	}
});

module.exports = MultiSelectField;
