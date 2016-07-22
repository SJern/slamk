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
    console.log(this.state.favorited);
    console.log(this.state.isFavorited);
    let buttonText = "☆";
    let isFavorited = false;

    let currentUser = SessionStore.currentUser();
    let favorites = FavoriteStore.findByUser(currentUser.id);
    console.log(favorites);
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
    console.log(this.state.favorited);
    console.log(this.state.isFavorited);
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
    }
  },
  // _addFavorite(){
  //   let currentUser = SessionStore.currentUser();
  //   FavoriteActions.createFavorite({
  //     user_id: currentUser.id,
  //     fav_message_id: this.props.message.id});
  // },
  // _removeFavorite(){
  //   let currentUser = SessionStore.currentUser();
  //   let message = this.props.message;
  //   FavoriteActions.deleteFavorite(this.state.favorited.id);
  // },

  render() {
    let info, body;
    const message = this.props.message;
    if (!this.props.showMessageOnly) {
      info = (<div>
        <div><b>{message.username}</b></div>
        <div>{(new Date(message.created_at)).toString().slice(4, 21)}</div>
      </div>);
    }
    if (/^https:\/\/gist\.github\.com\//.test(message.body)) {
      const gistId = message.body.match(/\w+$/)[0];
      body = <GistEmbed gistId={gistId}/>;
    } else {
      body = <div>{message.body}</div>;
    }
    return (
        <div>
          {info}
          <button
          className="favorite-button"
          onClick={this._toggleFavorite}>{this.state.favoriteText}</button>
          {body}
          </div>
    );
  }
});

module.exports = MessageIndexItem;
