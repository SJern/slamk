## Component Hierarchy

## Components
![components]

[components]: ./components/components.jpg



* **App**
  * **Splash**
    * LoginForm
  * **Chat**
    * **Navigation**
      * Menu
      * RoomsIndex
        * JoinChannelForm
        * NewRoomForm
        * RoomIndexItem
    * **Room**
      * Toolbar
      * MessagesIndex
        * MessageIndexItem
          * GistEmbed
      * Submission
        * NewSnippetForm
    * **FavBar**
      * Favorites
        * FavoriteIndexItem


## Routes

* **component:** `App` **path:** `/`
  * **component:** `Splash` **path:** index
    * **component:** `LoginForm` **path:** none
  * **component:** `Chat` **path:** `messages/general`
    * **component:** `Navigation` **path:** index
    * **component:** `Room` **path:** `messages/:roomTitle`
      * **component:** `Toolbar` **path:** none
      * **component:** `MessagesIndex` **path:** none
      * **component:** `Submission` **path:** none
    * **component:** `FavBar` **path:** none
