const React = require('react');
const MessageActions = require('../actions/message_actions');

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
      <input placeholder="press enter to send" type="text"
        value={this.state.body} onChange={this.update("body")} />
      </form>
    );
  }
});

module.exports = Submission;
