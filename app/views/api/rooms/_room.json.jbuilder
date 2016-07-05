json.extract! room, :id, :title, :channel
json.size room.users.size
row = RoomUser.find_by(room_id: room.id, user_id: current_user.id)
json.room_user_id (row ? row.id : nil)
