# Slamk

![main]
[main]: docs/images/main.png

Slamk is a full-stack web application inspired by the popular team-collaboration application [Slack][slack]. The single-page architecture is achieved using the Flux architecture and React.js on the front-end and Ruby on Rails on the back-end. The full site was developed in two weeks.

Check out Slamk [live][live] here.
[slack]: https://slack.com/
[live]: http://www.slamk.tech/
[veechau]: https://github.com/veechau

Special thanks to [veechau][veechau] for contributing to the project. Users can now add or remove their favorite messages!

![favorites]
[favorites]: docs/images/favorites.gif

## Features & Implementation

### Encrypted Bi-Directional Realtime Communication
![real_time]
[real_time]: docs/images/real_time.gif
![instant_snippet]
[instant_snippet]: docs/images/instant_snippet.gif
Slamk was built using the Pusher WebSocket API, so everything is real-time. It works for both new messages and new rooms. If I'm added to a room by a friend, that room will be added to my `RoomStore` immediately:
```
# ./app/controllers/api/room_users_controller.rb line 18
if @room && @user && authorized && @room_user.save
  Pusher.trigger("user_#{@user.id}", 'added_to_room', @room)

// ./frontend/components/room_index.jsx line 20
componentDidMount() {
  this.pusher = new Pusher('0d04cf841bc3ee166b79', {
    encrypted: true
  });
  let channel = this.pusher.subscribe(`user_${SessionStore.currentUser().id}`);
  channel.bind('added_to_room', function(room) {
    RoomActions.receiveSingleRoom(room);
  });
},
```
![index_update]
[index_update]: docs/images/index_update.gif
Unfortunately, new messages don't work as simple as that. To give the `MessagesIndex` a clean look, `username` and timestamp are displayed only once at the top of each cluster as shown below:

![message_index_item_display]
[message_index_item_display]: docs/images/message_index_item_display.png
And `MessageIndexItem` needs `username` to do the rendering:
```
// ./frontend/components/message_index_item.jsx line 69
info = (<div className="message-info">
  <div className="message-username"><b>{message.username}</b></div>
  <div className="message-date">{(new Date(message.created_at)).toString().slice(4, 21)}</div>
</div>);
```
Usually, the way to achieve that is to use Jbuilder:
```
# ./app/views/api/messages/_message.json.jbuilder
json.extract! message, :id, :created_at, :user_id, :body
json.username message.user.username
```
Here is the problem. Any new message my friend sends to my `MessageStore` won't come through Rails' View. It will come through the websocket protocol instead, which means it will not have access to Jbuilder.
##### Problem:
"Websocketed" messages cannot use Jbuilder to define the `username` attribute.
##### Solution:
Instead of providing the Pusher WebSocket API with just the instance variable `@message`, we can actually provide it with a Ruby Hash:
```
# ./app/controllers/api/messages_controller.rb line 16
if @message.save
  Pusher.trigger("room_#{@message.room_id}", 'message_created', {
    message: @message,
    username: current_user.username
  })
```
And then, deconstruct to reconstruct on the front-end JavaScript side:
```
// ./frontend/components/messages_index.jsx line 20
channel.bind('message_created', function(data) {
  const message = data.message;
  message.username = data.username
  MessageActions.receiveSingleMessage(message);
});
```
Note that we are forgetting something here. There is another thing about messages that makes them different. The `Room` and `MessagesIndex` components do not unmount or remount when switching between different rooms. If we only subscribe to a websocket channel when `componentDidMount`, we will stay listening to that same websocket channel even after we switch to a different room. It's okay, we can make a minor tweak:
```
// ./frontend/components/messages_index.jsx line 32
componentWillReceiveProps(nextProps) {
  this.pusher.unsubscribe(`room_${this.props.roomId}`);
  let channel = this.pusher.subscribe(`room_${nextProps.roomId}`);
},
```

### Source Code Snippet With Syntax Highlighting
![editor]
[editor]: docs/images/editor.png
The source code snippet feature has been Integrated by making jQuery AJAX requests to GitHub's API:
```
// ./frontend/components/new_snippet_form.jsx line 40
$.ajax({
  url: 'https://api.github.com/gists',
  method: 'POST',
  data: JSON.stringify({
    "public": true,
    "files": {
      [this.state.fileName]: {
      "content": `${this.state.body}`
      }
    }
  }),
```
When GitHub has successfully created the gist/snippet, it's going to send us back a JSON file with a whole bunch of data, but we are only interested in its html_url:
```
success(res) { MessageActions.createMessage({
  body: res.html_url,
  room_id: self.props.roomId
}); }
```
More specifically, it is the gistId part of the url we are interested in, which we will need later for creating some HTML elements. For now, we will create a message with the html_url as its body and save the message to our database.

But when should we close `NewSnippetModal`'s modal? A modal should close only when an operation was performed successfully. That usually means a store that the modal or its form-child listens to has emitted some change event (more on that later). In the case of `NewSnippetModal`, its child `NewSnippetForm` listens to `MessageStore`. When the message has been saved to the database and `MessageStore` has also received a copy of our newly created gist-message, we can close the modal! Wait a second, what if I have typed in 20 lines of code and my friend Calvin sends me a 2-letter message "hi". It hits my `MessageStore`. The store emits change and closes the modal with my 20 lines of code in it! I'm now mad and decide to turn passive-aggressive by not replying Calvin.
##### Problem:
Friendship in jeopardy.
##### Solution:
A normal modal-closing pattern is not going to cut it. Let's not ruin any more friendship and make a minor adjustment to the `MessageStore` by creating a private variable `_lastMessage`. We can now check to see if a new message is our own before closing our modal:
```
// ./frontend/components/new_snippet_form.jsx line 23
closeModalOnSuccess() {
  if (SessionStore.currentUser().id === MessageStore.lastMessageUserId()) {
    this.props.closeModal();
  }
},
```
Chatroom messages should always populate from bottom to top. This is simple enough to implement for normal messages. Whenever `MessagesIndex` updates with any new message:
```
// ./frontend/components/messsages_index.jsx line 26
componentDidUpdate: function() {
  const node = ReactDOM.findDOMNode(this);
  node.scrollTop = node.scrollHeight;
},
```
However, this alone wouldn't work for the gist-messages. The decision to store only the url of the gist is great because we are storing only what is necessary into our database, but this does pose a problem with the timing of scrolling. With only the gist url at our disposal, we will create some HTML elements by dynamically loading external JavaScript files:
```
// ./frontend/util/gist_embed.js line 43
let url = "https://gist.github.com/anonymous/" + this.props.gist + ".json?callback=" + gistCallback;
const script = document.createElement('script');
script.type = 'text/javascript';
script.src = url;
document.head.appendChild(script);
```
Here is the problem. We can load the JavaScript files only after `GistEmbed` mounts, which means `GistEmbed` is still an empty div when it is first mounted, and when `MessagesIndex` finishes updating and scrolling to the bottom.
##### Problem:
`MessagesIndex` scrolls to bottom before `GistEmbed`'s empty div expands. `MessagesIndex` looks like it has only scrolled to the middle of the list after the `GistEmbed` div expands.
```
// Timeline
MessageStore receives new gist-message
--> GistEmbed does mount and MessagesIndex scrolls to the "bottom"
--> The JavaScript we have appended loads and fills GistEmbed's div with actual content
```
##### Solution:
Okay, let's add a `scrollToBottom` function to `MessagesIndex` and pass it down to its grandchild `GistEmbed` as a prop:
```
// ./frontend/components/messsages_index.jsx line 47
scrollToBottom() {
  const node = ReactDOM.findDOMNode(this);
  node.scrollTop = node.scrollHeight;
},

// ./frontend/components/messsage_index_item.jsx line 81
<GistEmbed scroll={this.props.scroll} gist={gistId}/>
```
Now, `GistEmbed` has access to `scrollToBottom`, but when should it run it? `componentDidMount`? WillMount? WillReceiveProps? The div would still be empty and any scrolling would be meaningless. How about only after the innerHTML has been set?
```
// ./frontend/util/gist_embed.js line 35
window[gistCallback] = function(gist) {
  if (this.isMounted()) {
    this.setState({ loading: false, src: gist.div });
    GistEmbed.addStylesheet(gist.stylesheet);
    this.props.scroll();
  }
}.bind(this);
```
Voilà~

![editor_gif]
[editor_gif]: docs/images/editor.gif

### Parents and Children: Props, Flux, and Stores
Remember when we decided to make `NewSnippetModal`'s child `NewSnippetForm` listen to `MessageStore` and decide when to close the modal? Why don't we have the parent listen to the store instead? Well, the parent `NewSnippetModal` is always mounted even after the actual modal is closed. Therefore, if `NewSnippetModal` only removes the listener to `MessageStore` when `componentWillUnmount`, `MessageStore` will keep invoking `this.close` whenever change is emitted -- even when the actual modal is not open!

Unlike the `NewSnippetModal`, `NewSnippetForm` mounts and unmounts at better timing, therefore is a better candidate to determine when `closeModal` should be invoked by the `RoomStore`:
```
// ./frontend/components/new_snippet_modal.jsx line 37
<NewSnippetForm roomId={this.props.roomId} closeModal={this.close} />

// ./frontend/components/new_snippet_form.jsx line 18
componentDidMount() {
  this.modalListener = MessageStore.addListener(this.closeModalOnSuccess);
},
componentWillUnmount() {
  this.modalListener.remove();
},
```
`NewSnippetModal` can pass the `closeModal` prop to its child `NewSnippetForm`, but what if a child wants to pass something up to its parent? For example, we can add multiple team members to a direct-message room. `MultiSelectField` is a child of `NewRoomForm`. Whenever a user updates the list of other users to add to the room in `MultiSelectField`, `NewRoomForm` needs to have access to the updated list. Well, we can setup a `SelectionStore` that the parent can listen to. We then can kick off the Flux cycle whenever there is a change, as shown below:
```
// ./frontend/components/multi_select_field.jsx line 26
handleSelectChange (value) {
  let ids;
  if (value) {
    ids = value.split(',').map(id => parseInt(id));
  } else {
    ids = [];
  }
  SelectionActions.setSelections(ids);
  this.setState({ value: ids });
},
```
![add_members]
[add_members]: docs/images/add_members.gif

### CRUD
Slamk has all the CRUD (Create, Read, Update, and Delete) functionality for messages, rooms and so on. For example, we can create direct-message rooms and add team members to the room as discussed above. We can leave or destroy a room. We can also create a open channel or join one.

`JoinChannelForm` only shows a list of rooms that are "joinable". Direct-message rooms are *not* joinable. Channels that the user has already joined are also not joinable. We could do a query for all the rooms, do another query for the rooms the user has already joined, and then do some Ruby `#select`ing and `#reject`ing, but that would be so inefficient. Let's write a raw SQL query:
```
# ./app/controllers/api/rooms_controller.rb line 7
def joinable
  @channels = Room.find_by_sql([<<-SQL, current_user.id, true])
    SELECT
      rooms.id, rooms.title
    FROM
      rooms
    LEFT OUTER JOIN (
      SELECT
        *
      FROM
        room_users
      WHERE
        room_users.user_id = ?
    ) AS joined ON rooms.id = joined.room_id
    WHERE joined.id IS null AND rooms.channel = ?
  SQL
  render "api/rooms/channels"
end
```
Beautifully CRUDing it!

![channels]
[channels]: docs/images/channels.gif

### Is This User Authorized?

To protect the database, on the back-end, `RoomUsersController` makes sure the room a user is trying to join is not a private direct-message room, before letting him/her join it:
```
# ./app/controllers/api/room_users_controller.rb line 6
if @room && @room.channel && @room_user.save
  render "api/rooms/show"
```
`RoomUsersController` also makes sure a user is the creator or a member of a direct-message room, before letting that user add any other users to the room:
```
# ./app/controllers/api/room_users_controller.rb line 17
authorized = this_is_a_new(@room) || @room.users.include?(current_user)
if @room && @user && authorized && @room_user.save
  Pusher.trigger("user_#{@user.id}", 'added_to_room', @room)
```
Since the `ReactRouter` switches between rooms based on the `Route` path -- `/messages/:roomTitle` in our case. RoomsController makes sure the room with the `:roomTitle` indeed has such a member, or is the #general room, which everyone is a member of:
```
# ./app/controllers/api/rooms_controller.rb line 36
@room = Room.find_by(title: params[:room_title])
if @room && (general?(@room) || a_member_of(@room))
  render "api/rooms/show"
```

## Future Directions for the Project
In addition to the features already implemented, I plan to continue work on this project.  The next steps for Slamk are outlined below.
### Emoji and emoticons
