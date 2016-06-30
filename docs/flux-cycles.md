# Flux Cycles

Flux loops are organized by data type. Under each data type, there may
be sub-categories, and each action is listed with the sequence of events
that result from its invocation, ending with the API or store. Finally,
store listeners are listed at the end.

You should be able to use this document trace an **action** starting
with where it was invoked, through the **API**/**store** involved, and
finally to the **components** that update as a result. This is important
because once you start implementing your flux loops, that's precisely
what you'll need to do.


## Message Cycles

### Messages API Request Actions

* `fetchRoomMessages`
  0. invoked from `MessagesIndex` `didMount`/`willReceiveProps`
  0. `GET /api/messages` is called.
  0. `receiveRoomMessages` is set as the callback.

* `createMessage`
  0. invoked from `Submission` `onKeyUp` when `event.keyCode === 13`
  0. `POST /api/messages` is called.
  0. `receiveSingleMessage` is set as the callback.

* `updateMessage`
  0. invoked from `MessageForm` `onSubmit`
  0. `PATCH /api/messages/:id` is called.
  0. `receiveSingleMessage` is set as the callback.

* `destroyMessage`
  0. invoked from delete message button `onClick`
  0. `DELETE /api/messages/:id` is called.
  0. `removeMessage` is set as the callback.

### Messages API Response Actions

* `receiveRoomMessages`
  0. invoked from an API callback.
  0. `Message` store updates `_messages` and emits change.

* `receiveSingleMessage`
  0. invoked from an API callback.
  0. `Message` store updates `_messages[id]` and emits change.

* `removeMessage`
  0. invoked from an API callback.
  0. `Message` store removes `_messages[id]` and emits change.

### Store Listeners

* `MessagesIndex` component listens to `Message` store.


## Room Cycles

### Rooms API Request Actions

* `fetchAllRooms`
  0. invoked from `RoomsIndex` `didMount`/`willReceiveProps`
  0. `GET /api/rooms` is called.
  0. `receiveAllRooms` is set as the callback.

* `createRoom`
  0. invoked from new room button `onClick`
  0. `POST /api/rooms` is called.
  0. `receiveSingleRoom` is set as the callback.

* `fetchSingleRoom`
  0. invoked from `Room` `didMount`/`willReceiveProps`
  0. `GET /api/rooms/:id` is called.
  0. `receiveSingleRoom` is set as the callback.

* `updateRoom` (basically add members to room or change title)
  0. invoked from `RoomForm` `onSubmit`
  0. `PATCH /api/rooms/:id` is called.
  0. `receiveSingleRoom` is set as the callback.

* `joinRoom` (select from all channels only)
  0. invoked from join button `onClick`
  0. `POST /api/room_users` is called.
  0. `receiveSingleRoom` is set as the callback.

* `destroyRoom` (not literally destroying unless 0 member, usually just removing a room_user row)
  0. invoked from delete room button `onClick`
  0. `DELETE /api/rooms/:id` is called if 0 member.
  0. `DELETE /api/room_users/:id` is called otherwise. (How to get id in the first place???)
  0. `removeRoom` is set as the callback.

### Notebooks API Response Actions

* `receiveAllRooms`
  0. invoked from an API callback.
  0. `Room` store updates `_rooms` and emits change.

* `receiveSingleRoom`
  0. invoked from an API callback.
  0. `Room` store updates `_rooms[id]` and emits change.

* `removeRoom`
  0. invoked from an API callback.
  0. `Room` store removes `_rooms[id]` and emits change.

### Store Listeners

* `RoomsIndex` component listens to `Room` store.


## SearchSuggestion Cycles

* `fetchSearchSuggestions`
  0. invoked from `RoomSearchBar` `onChange` when there is text
  0. `GET /api/rooms` is called with `text` param.
  0. `receiveSearchSuggestions` is set as the callback.

* `receiveSearchSuggestions`
  0. invoked from an API callback.
  0. `SearchSuggestion` store updates `_suggestions` and emits change.

* `removeSearchSuggestions`
  0. invoked from `RoomSearchBar` `onChange` when empty
  0. `SearchSuggestion` store resets `_suggestions` and emits change.

### Store Listeners

* `SearchBarSuggestions` component listens to `SearchSuggestion` store.
