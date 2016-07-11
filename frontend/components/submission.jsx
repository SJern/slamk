const React = require('react');
const MessageActions = require('../actions/message_actions');

import { InputGroup, DropdownButton, MenuItem, FormControl } from 'react-bootstrap';

const Submission = React.createClass({
  getInitialState() {
    return {body: ""};
  },

  update(property) {
    return (e) => this.setState({[property]: e.target.value});
  },

  handleEnter(e) {
    e.preventDefault();
    if (this.state.body) {
      MessageActions.createMessage({
        body: this.state.body,
        room_id: this.props.roomId
      });
      this.setState({body: ""});
    }
  },

  render() {
    return (
      <form id="messages-input-container" onSubmit={this.handleEnter}>
        <InputGroup>
          <DropdownButton dropup
            componentClass={InputGroup.Button}
            id="input-dropdown-addon"
            title="Action"
          >
            <MenuItem key="1">Item</MenuItem>
          </DropdownButton>
          <FormControl type="text" placeholder="Press enter to send" value={this.state.body} onChange={this.update("body")}/>
        </InputGroup>
      </form>
    );
  }
});

module.exports = Submission;
