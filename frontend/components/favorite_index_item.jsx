const React = require('react');
const MessageStore = require('../stores/message_store');
const MessageActions = require('../actions/message_actions');
const FavoriteStore = require('../stores/favorite_store');
const FavoriteActions = require('../actions/favorite_actions');

const FavoriteIndexItem = React.createClass({
  getInitialState(){
    return {
      messages: [],
      favorites: []};
  },
  componentDidMount() {
    this.messageStoreListener = MessageStore.addListener(this._onChange);
    MessageActions.fetchRoomMessages(this.props.roomId);
    this.favoriteStoreListener = FavoriteStore.addListener(this._onFavoriteChange);
    FavoriteActions.fetchFavorites();
  },
  componentWillUnmount() {
    this.messageStoreListener.remove();
    this.favoriteStoreListener.remove();
  },
  _onChange(){
    this.setState({ messages: MessageStore.all()});
  },
  _onFavoriteChange(){
    this.setState({ messages: MessageStore.all(), favorites: FavoriteStore.all()});
  },
  _removeFavorite(e){
    e.preventDefault();
    FavoriteActions.deleteFavorite(this.props.favorite.id);
    FavoriteActions.fetchFavorites();
  },
  render(){
    let content = "";
    let message = MessageStore.find(this.props.favorite.fav_message_id);
    if (message) {
      content =  (
        <div>
          <p>{message.username}</p>
          <p>{message.body}</p>
          <p>{message.created_at}</p>
          <button onClick={this._removeFavorite}>★</button>
        </div>
      );
    }
    return (
      <li>{content}</li>
    );
  }
});

module.exports = FavoriteIndexItem;
