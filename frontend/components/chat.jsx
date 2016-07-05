const React = require('react');
const ReactRouter = require('react-router');
const hashHistory = ReactRouter.hashHistory;

const Navigation = require('./navigation');
const Room = require('./room');
const RoomApiUtil = require('../util/room_api_util');

const Chat = React.createClass({
  getInitialState() {
    return { room: {id: 1, title: 'general'} };
  },
  setRoom(room) {
    this.setState({room: room});
  },
  componentWillReceiveProps(nextProps) {
    RoomApiUtil.fetchSingleRoomByTitle(nextProps.params.roomTitle,
      this.setRoom,
      () => hashHistory.push("/messages/general")
    );
  },
  render() {
    return (
      <div>
        <Navigation room={this.state.room} />
        <Room room={this.state.room} />
      </div>
    );
  }
});

module.exports = Chat;
