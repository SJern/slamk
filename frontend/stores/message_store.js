const AppDispatcher = require('../dispatcher/dispatcher.js');
const Store = require('flux/utils').Store;
const MessageConstants = require('../constants/message_constants');

const MessageStore = new Store(AppDispatcher);

let _messages = {};
let _allmessages= {};
let _lastMessage = {};

MessageStore.all = function() {
  const messages = [];
  Object.keys(_messages).forEach(key => messages.push(_messages[key]));
  return messages.sort((m1, m2) => new Date(m1.created_at) - new Date(m2.created_at));
};

MessageStore.allMessages = function() {
  const allmessages = [];
  Object.keys(_allmessages).forEach(key => allmessages.push(_allmessages[key]));
  return allmessages.sort((m1, m2) => new Date(m1.created_at) - new Date(m2.created_at));
};

MessageStore.findFavorite = function(messageId) {
  return _allmessages[messageId];
};

MessageStore.find = function(messageId){
  return _messages[messageId];
};

MessageStore.lastMessageUserId = function() {
  return _lastMessage.user_id;
};

function resetMessages(messages){
  _allmessages = {};
  messages.forEach(message => _allmessages[message.id] = message);
  MessageStore.__emitChange();
}

function resetRoomMessages(messages) {
  _messages = {};
  messages.forEach(message => _messages[message.id] = message);
  MessageStore.__emitChange();
}

function resetSingleMessage(message) {
  _lastMessage = message;
  _messages[message.id] = message;
  MessageStore.__emitChange();
}

function removeSingleMessage(message) {
  delete _messages[message.id];
  MessageStore.__emitChange();
}

MessageStore.__onDispatch = function(payload) {
  switch (payload.actionType) {
    case MessageConstants.ALLMESSAGES_RECEIVED:
      resetMessages(payload.messages);
      break;
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

module.exports = MessageStore;
