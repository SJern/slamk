const React = require('react');
const ReactRouter = require('react-router');
const hashHistory = ReactRouter.hashHistory;

const SessionStore = require('../stores/session_store');
const RoomStore = require('../stores/room_store');
const RoomActions = require('../actions/room_actions');
const RoomIndexItem = require('./room_index_item');

const NewRoomModal = require('./new_room_modal');
const JoinChannelModal = require('./join_channel_modal');

const RoomsIndex = React.createClass({
  getInitialState() {
    return { rooms: RoomStore.all() };
  },
  componentDidMount() {
    this.roomsListener = RoomStore.addListener(this.handleChange);
    RoomActions.fetchJoinedRooms();
    this.pusher = new Pusher('0d04cf841bc3ee166b79', {
      encrypted: true
    });
    let channel = this.pusher.subscribe(`user_${SessionStore.currentUser().id}`);
    channel.bind('added_to_room', function(room) {
      RoomActions.receiveSingleRoom(room);
    });
  },
  handleChange() {
    this.setState({ rooms: RoomStore.all() });
  },
  componentWillUnmount() {
    this.roomsListener.remove();
    this.pusher.unsubscribe(`user_${SessionStore.currentUser().id}`);
  },

  render() {
    const rooms = this.state.rooms;
    const channels = rooms.filter(room => room.channel);
    const dMs = rooms.filter(room => !room.channel);
    const self = this;
    return (
      <div className="nav-menu">
        <div className="channels-menu">
          <JoinChannelModal />
          <NewRoomModal isChannel={true} />
        </div>
        {channels.map(channel => {
          return <RoomIndexItem key={channel.id} room={channel} />;
        })}
        <div className="channels-menu dms-menu">
          <div className="dm-menu-title">DIRECT MESSAGES</div>
          <NewRoomModal isChannel={false} />
        </div>
        {dMs.map(dM => {
          return <RoomIndexItem key={dM.id} room={dM} />;
        })}
      </div>
    );
  }
});

module.exports = RoomsIndex;
