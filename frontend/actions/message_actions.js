const AppDispatcher = require('../dispatcher/dispatcher');
const MessageConstants = require('../constants/message_constants');
const MessageApiUtil = require('../util/message_api_util');

const MessageActions = {
  fetchMessages() {
    MessageApiUtil.fetchMessages(this.receiveMessages);
  },
  fetchRoomMessages(room_id) {
    MessageApiUtil.fetchRoomMessages(room_id, this.receiveRoomMessages);
  },
  createMessage(message) {
    MessageApiUtil.createMessage(message, this.receiveSingleMessage);
  },
  updateMessage(message) {
    MessageApiUtil.updateMessage(message, this.receiveSingleMessage);
  },
  deleteMessage(id) {
      MessageApiUtil.deleteMessage(id, this.removeMessage);
  },
  receiveMessages(messages) {
    AppDispatcher.dispatch({
      actionType: MessageConstants.ALLMESSAGES_RECEIVED,
      messages: messages
    });
  },
  receiveRoomMessages(messages) {
    AppDispatcher.dispatch({
      actionType: MessageConstants.MESSAGES_RECEIVED,
      messages: messages
    });
  },
  receiveSingleMessage(message) {
    AppDispatcher.dispatch({
      actionType: MessageConstants.MESSAGE_RECEIVED,
      message: message
    });
  },
  removeMessage(message) {
    AppDispatcher.dispatch({
      actionType: MessageConstants.MESSAGE_REMOVED,
      message: message
    });
  }
};

module.exports = MessageActions;
