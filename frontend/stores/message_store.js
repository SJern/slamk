const AppDispatcher = require('../dispatcher/dispatcher.js');
const Store = require('flux/utils').Store;
const MessageConstants = require('../constants/message_constants');

const MessageStore = new Store(AppDispatcher);

let _messages = {};

MessageStore.all = function() {
  return Object.assign({}, _messages);
};

function resetRoomMessages(messages) {
  _messages = {};
  messages.forEach(message => _messages[message.id] = message);
  MessageStore.__emitChange();
}

function resetSingleMessage(message) {
  _messages[message.id] = message;
  MessageStore.__emitChange();
}

function removeSingleMessage(message) {
  delete _messages[message.id];
  MessageStore.__emitChange();
}

MessageStore.__onDispatch = function(payload) {
  switch (payload.actionType) {
    case MessageConstants.MESSAGES_RECEIVED:
      resetRoomMessages(payload.messages);
      break;
    case MessageConstants.MESSAGE_RECEIVED:
      resetSingleMessage(payload.message);
      break;
    case MessageConstants.MESSAGE_REMOVED:
      removeSingleMessage(payload.message);
  }
};

module.exports = Messagestore;
