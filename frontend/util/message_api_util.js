const MessageApiUtil = {
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
  }
};

module.exports = MessageApiUtil;
