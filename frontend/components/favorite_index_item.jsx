const React = require('react');
const MessageStore = require('../stores/message_store');
const MessageActions = require('../actions/message_actions');
const FavoriteStore = require('../stores/favorite_store');
const FavoriteActions = require('../actions/favorite_actions');

const FavoriteIndexItem = React.createClass({
  getInitialState(){
    return {
      allmessages: [],
      favorites: []
    };
  },
  componentDidMount() {
    this.messageStoreListener = MessageStore.addListener(this._onChange);
    MessageActions.fetchMessages();
    this.favoriteStoreListener = FavoriteStore.addListener(this._onFavoriteChange);
    FavoriteActions.fetchFavorites();
  },
  componentWillUnmount() {
    this.messageStoreListener.remove();
    this.favoriteStoreListener.remove();
  },
  _onChange(){
    this.setState({ allmessages: MessageStore.allMessages()});
  },
  _onFavoriteChange(){
    this.setState({ allmessages: MessageStore.allMessages(), favorites: FavoriteStore.all()});
  },
  _removeFavorite(e){
    e.preventDefault();
    FavoriteActions.deleteFavorite(this.props.favorite.id);
    FavoriteActions.fetchFavorites();
  },
  render(){
    let content = "";
    let message = MessageStore.findFavorite(this.props.favorite.fav_message_id);
    if (message) {
      content =  (
        <div className="favorite-index-item">
          <div className="favorite-username">{message.username}</div>
          <div className="favorite-msg-info">
          <div className="favorite-date">{(new Date(message.created_at)).toString().slice(4, 21)}</div>
          <button
            className="favorite-button"
            onClick={this._removeFavorite}>★</button>
          </div>
          <div className="favorite-message">{message.body}</div>
        </div>
      );
    }
    return (
      <li>{content}</li>
    );
  }
});

module.exports = FavoriteIndexItem;
