const React = require('react');
const ReactRouter = require('react-router');
const hashHistory = ReactRouter.hashHistory;

const RoomIndexItem = React.createClass({
  handleSelection(room) {
    hashHistory.push(`/messages/${room.title}`);
  },

  render() {
    const room = this.props.room;
    return (
        <div>
          <div onClick={this.handleSelection.bind(null, this.props.room)}>
          {room.channel ? '#' : '@'}{room.title}
          {(room.size > 2 && !room.channel) ? ',...' : ''}</div>
        </div>
    );
  }
});

module.exports = RoomIndexItem;
