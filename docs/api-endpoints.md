# API Endpoints

## JSON API

### Root

- `GET /` - loads React web app

### Users

- `GET /api/users`
- `GET /api/guest`
  - creates demo users with random star wars character names
- `POST /api/user`

### Session

- `GET /api/session`
- `POST /api/session`
- `DELETE /api/session`

### Rooms

- `GET /api/rooms/:title`
  - loads room by title
- `GET /api/channels/joinable`
  - find rooms (channels only) that user hasn't joined yet
- `GET /api/rooms`
- `POST /api/rooms`
- `PATCH /api/rooms/:id`
- `DELETE /api/rooms/:id`

### RoomUsers

- `POST /api/room_users/add`
  - add other users to direct-message rooms
- `POST /api/room_users`
  - join oneself to any authorized room
- `DELETE /api/room_users/:id`

### Messages

- `GET /api/favorites/allmessages`
  - loads user's favorite messages
- `GET /api/messages`
- `POST /api/messages`
- `PATCH /api/messages/:id`
- `DELETE /api/messages/:id`

### Favorites

- `GET /api/favorites`
- `POST /api/favorites`
- `DELETE /api/favorites/:id`
