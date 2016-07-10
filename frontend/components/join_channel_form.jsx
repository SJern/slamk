const React = require('react');
const ReactRouter = require('react-router');
const hashHistory = ReactRouter.hashHistory;

import Select from 'react-select';
const RoomApiUtil = require('../util/room_api_util');
const RoomActions = require('../actions/room_actions');
const RoomStore = require('../stores/room_store');
const SessionStore = require('../stores/session_store');

var JoinChannelForm = React.createClass({
	getInitialState() {
		return {};
	},
	componentDidMount() {
		RoomApiUtil.fetchJoinableChannels(this.setOptions);
    this.modalListener = RoomStore.addListener(this.props.closeModal);
    this.redirectListener = RoomStore.addListener(this.redirectIfLoggedIn);
  },
	componentWillUnmount() {
		this.modalListener.remove();
		this.redirectListener.remove();
	},
	setOptions(channels) {
		this.setState({options: channels});
	},
	redirectIfLoggedIn() {
		if (SessionStore.isUserLoggedIn()) {
			hashHistory.push(`/messages/${this.state.title}`);
		}
	},
	updateValue(newValue) {
		this.setState({ title: newValue.label });
		RoomActions.joinRoom(newValue.value);
	},

	render() {
		return (
			<div>
				<Select options={this.state.options} placeholder="Choose a channel to join" onChange={this.updateValue} />
			</div>
		);
	}
});

module.exports = JoinChannelForm;
