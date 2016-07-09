const React = require('react');
const ReactRouter = require('react-router');
const hashHistory = ReactRouter.hashHistory;

const RoomStore = require('../stores/room_store');
const RoomActions = require('../actions/room_actions');
const ErrorStore = require('../stores/error_store');
const ErrorActions = require('../actions/error_actions');
const SessionStore = require('../stores/session_store');
import { Form, FormGroup, ControlLabel, Col, FormControl, Button, Nav, NavItem } from 'react-bootstrap';

const MultiSelectField = require('./multi_select_field');
const SelectionStore = require('../stores/selection_store');
const SelectionActions = require('../actions/selection_actions');

const LoginForm = React.createClass({
  getInitialState() {
    return {title: "", userIds: []};
  },

  componentDidMount() {
    this.errorListener = ErrorStore.addListener(this.forceUpdate.bind(this));
    this.modalListener = RoomStore.addListener(this.props.closeModal);
    this.redirectListener = RoomStore.addListener(this.redirectIfLoggedIn);
    this.selectionsListener = SelectionStore.addListener(this.setUserIds);
  },

  componentWillUnmount() {
    this.errorListener.remove();
		ErrorActions.clearErrors();
    this.modalListener.remove();
    this.redirectListener.remove();
    this.selectionsListener.remove();
    SelectionActions.clearSelections();
  },

  setUserIds() {
    this.setState({ userIds: SelectionStore.all() });
  },

	redirectIfLoggedIn() {
		if (SessionStore.isUserLoggedIn()) {
			hashHistory.push(`/messages/${this.state.title}`);
		}
	},

	handleSubmit(e) {
		e.preventDefault();

		let roomData;
		if (this.props.isChannel) {
			roomData = {
				title: (this.state.title || undefined),
				channel: true
			};
			RoomActions.createRoom(roomData, this.state.userIds);
		} else {
			roomData = {
				title: (this.state.title || undefined),
				channel: false
			};
			RoomActions.createRoom(roomData, this.state.userIds);
		}
	},

  fieldErrors(field) {
		const roomType = this.props.isChannel ? "channel" : "dM";
    const errors = ErrorStore.formErrors(roomType);

    if (!errors[field]) { return; }

    const messages = errors[field].map( (errorMsg, i) => {
      return <li key={ i }>{ errorMsg }</li>;
    });

    return <ul>{ messages }</ul>;
  },

  update(property) {
    return (e) => this.setState({[property]: e.target.value});
  },

	render() {
    let extraFields;
    if (!this.props.isChannel) {
			extraFields = (
				<FormGroup controlId="formControlsSelectMultiple">
					<ControlLabel>Multiple select</ControlLabel>
					<MultiSelectField />
				</FormGroup>
			);
    }

		return (
			<div>
				<form onSubmit={this.handleSubmit}>
					<FormGroup controlId="formControlsTitle">
						<ControlLabel>Room Title</ControlLabel>
						<FormControl type="text" placeholder="Enter Title" value={this.state.title} onChange={this.update("title")} />{ this.fieldErrors("title") }
					</FormGroup>

					{extraFields}

					<Button type="submit">
						Go
					</Button>
				</form>
			</div>
		);
	}
});

module.exports = LoginForm;
