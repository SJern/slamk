# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)

Room.create(title:'general', channel: true)
Room.create(title:'all-about-ann', channel: true)
Room.create(title:'knope,ann', channel: false)
Room.create(title:'april,knope', channel: false)
User.create(guest: false, username: "knope", password: "123456", fname: "Leslie", lname: "Knope", email: "what_would_leslie_do@parks&app.com")
User.create(guest: false, username: "ann", password: "123456", fname: "Ann", lname: "Perkins", email: "beautiful_tropical_fish@parks&app.com")
User.create(guest: false, username: "april", password: "123456", fname: "April", lname: "Ludgate", email: "I_am_half_wolf@parks&app.com")
User.create(guest: false, username: "andy", password: "123456", fname: "Andy", lname: "Dwyer", email: "eagle_one@parks&app.com")
RoomUser.create(room_id: 1, user_id: 1)
RoomUser.create(room_id: 1, user_id: 2)
RoomUser.create(room_id: 1, user_id: 3)
RoomUser.create(room_id: 1, user_id: 4)
RoomUser.create(room_id: 2, user_id: 1)
RoomUser.create(room_id: 2, user_id: 2)
RoomUser.create(room_id: 2, user_id: 3)
RoomUser.create(room_id: 2, user_id: 4)
RoomUser.create(room_id: 3, user_id: 1)
RoomUser.create(room_id: 3, user_id: 2)
RoomUser.create(room_id: 4, user_id: 1)
RoomUser.create(room_id: 4, user_id: 3)
RoomUser.create(room_id: 4, user_id: 4)

Message.create(user_id: 1, body: "Hello1", room_id: 2)
Message.create(user_id: 1, body: "Hello2", room_id: 1)
Message.create(user_id: 3, body: "Hello3", room_id: 1)
Message.create(user_id: 2, body: "Hello4", room_id: 3)
Message.create(user_id: 4, body: "Hello5", room_id: 1)
Message.create(user_id: 4, body: "Hello6", room_id: 4)
Message.create(user_id: 1, body: "Hello7", room_id: 4)

Favorite.create(user_id: 1, fav_message_id: 1)
Favorite.create(user_id: 2, fav_message_id: 2)
Favorite.create(user_id: 3, fav_message_id: 3)
Favorite.create(user_id: 4, fav_message_id: 4)
Favorite.create(user_id: 1, fav_message_id: 2)
