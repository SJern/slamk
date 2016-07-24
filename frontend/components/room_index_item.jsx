const React = require('react');
const ReactRouter = require('react-router');
const hashHistory = ReactRouter.hashHistory;

const RoomActions = require('../actions/room_actions');

const TiDelete = require('react-icons/lib/ti/delete');
import { Tooltip, OverlayTrigger } from 'react-bootstrap';

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
    const tooltip = (
      <Tooltip id="tooltip">Leave this {room.channel ? 'channel' : 'direct-message room'}</Tooltip>
    );
    let leaveButton;
    if (room.title !== "general") {
      leaveButton = (
        <OverlayTrigger placement="right" overlay={tooltip}>
          <TiDelete color="white" onClick={this.leaveRoom.bind(null, room)} />
        </OverlayTrigger>
      );
    }
    return (
        <div className="channel-names">
          <div className="channel-title" onClick={this.handleSelection.bind(null, this.props.room)}>
          {room.channel ? '#' : '@'}{room.title}
          {(room.size > 2 && !room.channel) ? ',...' : ''}</div>
          {leaveButton}
        </div>
    );
  }
});

module.exports = RoomIndexItem;
