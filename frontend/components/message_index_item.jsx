const React = require('react');
const GistEmbed = require('../util/gist_embed');
const FavoriteActions = require('../actions/favorite_actions');
const FavoriteStore = require('../stores/favorite_store');
const SessionStore = require('../stores/session_store');
const MessageStore = require('../stores/message_store');


const MessageIndexItem = React.createClass({
  getInitialState(){
    return {
      favorites: [],
      favorited: FavoriteStore.findFavorited(
        SessionStore.currentUser().id,
        this.props.message.id
      ),
      isFavorited: false,
      favoriteText: "☆"
    };
  },
  componentDidMount(){
    this.messageStoreListener = MessageStore.addListener(this.forceUpdate.bind(this));
    this.favoriteStoreListener = FavoriteStore.addListener(this._favoriteChange);
    FavoriteActions.fetchFavorites();
  },
  componentWillUnmount(){
    this.favoriteStoreListener.remove();
    this.messageStoreListener.remove();
  },
  _favoriteChange(){
    let buttonText = "☆";
    let isFavorited = false;

    let currentUser = SessionStore.currentUser();
    let favorites = FavoriteStore.findByUser(currentUser.id);
    favorites.forEach(favorite => {
      if (this.props.message.id === favorite.fav_message_id) {
        buttonText = "★";
        isFavorited = true;
      }
    });

    this.setState({
      favorites: FavoriteStore.findByUser(currentUser.id),
      favorited: FavoriteStore.findFavorited(
        currentUser.id,
        this.props.message.id),
      isFavorited: isFavorited,
      favoriteText: buttonText
    });
  },
  _toggleFavorite(e){
    e.preventDefault();
    let currentUser = SessionStore.currentUser();
    let message = this.props.message;
    if (this.state.favoriteText === "☆"){
      FavoriteActions.createFavorite({
        user_id: currentUser.id,
        fav_message_id: message.id});
    } else {
      FavoriteActions.deleteFavorite(this.state.favorited.id);
      FavoriteActions.fetchFavorites();
    }
  },
  render() {
    let info, body;
    const message = this.props.message;
    if (!this.props.showMessageOnly) {
      info = (<div className="message-info">
        <div className="message-username"><b>{message.username}</b></div>
        <div className="message-date">{(new Date(message.created_at)).toString().slice(4, 21)}</div>
      </div>);
    }
    if (/^https:\/\/gist\.github\.com\//.test(message.body)) {
      const gistId = message.body.match(/\w+$/)[0];
      body = (
        <div className="message-body">
          <button
          className="favorite-button"
          onClick={this._toggleFavorite}>{this.state.favoriteText}</button>
          <GistEmbed scroll={this.props.scroll} gist={gistId}/>
        </div>
      );
    } else {
      body = (
        <div className="message-body">
          <button
          className="favorite-button"
          onClick={this._toggleFavorite}>{this.state.favoriteText}</button>
          <div>{message.body}</div>
        </div>
      );
    }
    return (
        <div>
          {info}
          {body}
        </div>
    );
  }
});

module.exports = MessageIndexItem;
