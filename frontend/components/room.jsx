const React = require('react');
const Toolbar = require('./toolbar');
const MessagesIndex = require('./messages_index');
const Submission = require('./submission');

const Room = React.createClass({
  render() {
    return (
      <div>
        <Toolbar title="#general"/>
        <MessagesIndex roomId={1} />
        <Submission roomId={1} />
      </div>
    );
  }
});

module.exports = Room;
