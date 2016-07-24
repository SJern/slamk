const MessageApiUtil = {
  fetchMessages(success) {
    $.ajax({
      url: 'api/favorites/allmessages',
      success,
      error: function () {
        console.log("error in MessageApiUtil#fetchMessages");
      }
    });
  },
  fetchRoomMessages(room_id, success) {
    $.ajax({
      url: 'api/messages',
      data: {room_id: room_id},
      success,
			error: function () {
			  console.log("error in MessageApiUtil#fetchRoomMessages");
			}
    });
  },
  createMessage(message, success) {
    $.ajax({
      url: 'api/messages',
      method: 'POST',
      data: { message },
      success,
      error: function () {
        console.log("error in MessageApiUtil#createMessage");
      }
    });
  },
  updateMessage(message, success) {
    $.ajax({
      url: `api/messages/${message.id}`,
      method: 'PATCH',
      data: { message },
      success,
      error: function () {
        console.log("error in MessageApiUtil#updateMessage");
      }
    });
  },
  deleteMessage(id, success) {
    $.ajax({
      url: `api/messages/${id}`,
      method: 'DELETE',
      success,
      error: function () {
        console.log("error in MessageApiUtil#deleteMessage");
      }
    });
  }
};

module.exports = MessageApiUtil;
