const ReactRouter = require('react-router');
const hashHistory = ReactRouter.hashHistory;

const AppDispatcher = require('../dispatcher/dispatcher.js');
const Store = require('flux/utils').Store;
const RoomConstants = require('../constants/room_constants');

const RoomStore = new Store(AppDispatcher);

let _rooms = {};

RoomStore.all = function() {
  const rooms = [];
  Object.keys(_rooms).forEach(key => rooms.push(_rooms[key]));
  return rooms;
};

RoomStore.find = function(id) {
  return _rooms[id];
};

function resetAllRooms(rooms) {
  _rooms = {};
  rooms.forEach(room => _rooms[room.id] = room);
  RoomStore.__emitChange();
}

function resetSingleRoom(room) {
  _rooms[room.id] = room;
  RoomStore.__emitChange();
}

function removeSingleRoom(room) {
  delete _rooms[room.id];
  hashHistory.push("/messages/general");
  RoomStore.__emitChange();
}

RoomStore.__onDispatch = function(payload) {
  switch (payload.actionType) {
    case RoomConstants.ROOMS_RECEIVED:
      resetAllRooms(payload.rooms);
      break;
    case RoomConstants.ROOM_RECEIVED:
      resetSingleRoom(payload.room);
      break;
    case RoomConstants.ROOM_REMOVED:
      removeSingleRoom(payload.room);
  }
};

module.exports = RoomStore;
