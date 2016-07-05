const React = require('react');
const Navigation = require('./navigation');
const Room =require('./room');

const Chat = React.createClass({
  render() {
    return (
      <div>
        <Navigation check={this.props.params.roomTitle} />
        <Room />
      </div>
    );
  }
});

module.exports = Chat;
