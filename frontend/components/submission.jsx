const React = require('react');
const MessageActions = require('../actions/message_actions');

import { InputGroup, DropdownButton, MenuItem, FormControl } from 'react-bootstrap';
const MdApps = require('react-icons/lib/md/apps');

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
          <DropdownButton dropup noCaret
            componentClass={InputGroup.Button}
            id="input-dropdown-addon"
            title={<MdApps />}>
            <MenuItem>Create a snippet of code</MenuItem>
          </DropdownButton>
          <FormControl type="text" placeholder="Press enter to send" value={this.state.body} onChange={this.update("body")}/>
        </InputGroup>
      </form>
    );
  }
});

module.exports = Submission;
