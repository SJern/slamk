const React = require('react');
const ReactRouter = require('react-router');
const hashHistory = ReactRouter.hashHistory;

const Navigation = require('./navigation');
const Room = require('./room');
const RoomApiUtil = require('../util/room_api_util');

const FavBar = require('./fav-sidebar');

const Chat = React.createClass({
  getInitialState() {
    return { room: {id: 1} };
  },
  setRoom(room) {
    this.setState({room: room});
  },
  componentWillMount() {
    RoomApiUtil.fetchSingleRoomByTitle(this.props.params.roomTitle,
      this.setRoom,
      () => hashHistory.push("/messages/general")
    );
  },
  componentWillReceiveProps(nextProps) {
    RoomApiUtil.fetchSingleRoomByTitle(nextProps.params.roomTitle,
      this.setRoom,
      () => hashHistory.push("/messages/general")
    );
  },
  shouldComponentUpdate: function(nextProps, nextState) {
    return ((this.state.room.id === 1) || (nextState.room.id !== this.state.room.id) || (nextState.room.size > this.state.room.size));
  },
  render() {
    return (
      <div id="client-ui">
        <Navigation room={this.state.room} />
        <Room room={this.state.room} />
        <FavBar roomId={this.state.room.id} />
      </div>
    );
  }
});

module.exports = Chat;
