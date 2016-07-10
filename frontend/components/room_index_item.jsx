const React = require('react');
const ReactRouter = require('react-router');
const hashHistory = ReactRouter.hashHistory;

const RoomActions = require('../actions/room_actions');

const TiDelete = require('react-icons/lib/ti/delete');

const RoomIndexItem = React.createClass({
  handleSelection(room) {
    hashHistory.push(`/messages/${room.title}`);
  },
  leaveRoom(room, e) {
    e.preventDefault();
    if (room.size === 1) {
      RoomActions.destroyRoom(room.id);
    } else {
      RoomActions.unjoinRoom(room.room_user_id);
    }
  },

  render() {
    const room = this.props.room;
    let leaveButton;
    if (room.title !== "general") {
      leaveButton = <TiDelete color="white" onClick={this.leaveRoom.bind(null, room)} />;
    }
    return (
        <div>
          <div onClick={this.handleSelection.bind(null, this.props.room)}>
          {room.channel ? '#' : '@'}{room.title}
          {(room.size > 2 && !room.channel) ? ',...' : ''}</div>
          {leaveButton}
        </div>
    );
  }
});

module.exports = RoomIndexItem;
