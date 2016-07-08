const AppDispatcher = require('../dispatcher/dispatcher');
const RoomConstants = require('../constants/room_constants');
const ErrorActions = require('./error_actions');

const RoomActions = {
  fetchJoinedRooms() {
    RoomApiUtil.fetchJoinedRooms(this.receiveJoinedRooms);
  },
  createRoom(roomData, userIds) {
    RoomApiUtil.createRoom(roomData, userIds, this.receiveSingleRoom, ErrorActions.setErrors);
  },
  addRoomMember(room_id, user_id) {
    RoomApiUtil.addRoomMember(room_id, user_id, this.receiveSingleRoom);
  },
  joinRoom(room_id) {
    RoomApiUtil.joinRoom(room_id, this.receiveSingleRoom);
  },
  unjoinRoom(room_user_id) {
    RoomApiUtil.unjoinRoom(room_user_id, this.removeRoom);
  },
  destroyRoom(room_id) {
    RoomApiUtil.destroyRoom(room_id, this.removeRoom);
  },

  receiveJoinedRooms(rooms) {
    AppDispatcher.dispatch({
      actionType: RoomConstants.ROOMS_RECEIVED,
      rooms: rooms
    });
  },
  receiveSingleRoom(room) {
    AppDispatcher.dispatch({
      actionType: RoomConstants.ROOM_RECEIVED,
      room: room
    });
  },
  removeRoom(room) {
    AppDispatcher.dispatch({
      actionType: RoomConstants.ROOM_REMOVED,
      room: room
    });
  }
};

module.exports = RoomActions;
