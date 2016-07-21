const React = require('react');
const GistEmbed = require('../util/gist_embed');
const FavoriteActions = require('../actions/favorite_actions');
const FavoriteStore = require('../stores/favorite_store');
const SessionStore = require('../stores/session_store');

const MessageIndexItem = React.createClass({
  getInitialState(){
    return {
      favorites: [],
      favorited: FavoriteStore.findFavorited(
        SessionStore.currentUser().id,
        this.props.message.id
      )
    };
  },
  componentDidMount(){
    this.favoriteStoreListener = FavoriteStore.addListener(this._favoriteChange);
    FavoriteActions.fetchFavorites();
  },
  componentWillUnmount(){
    this.favoriteStoreListener.remove();
  },
  _favoriteChange(){
    console.log(`All Favorites Length: ${FavoriteStore.all().length}`);
    this.setState({
      favorites: FavoriteStore.all(),
      favorited: FavoriteStore.findFavorited(
        SessionStore.currentUser().id,
        this.props.message.id
      )
    });
  },
  _addFavorite(){
    let currentUser = SessionStore.currentUser();
    FavoriteActions.createFavorite({
      user_id: currentUser.id,
      fav_message_id: this.props.message.id});
  },
  _removeFavorite(){
    let currentUser = SessionStore.currentUser();
    let message = this.props.message;
    FavoriteActions.deleteFavorite(this.state.favorited.id);
  },

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
          {body}
          <div
          className="favorite-button"
          onClick={this._addFavorite}>Add Favorite</div>
          <div
          className="favorite-button"
          onClick={this._removeFavorite}>Remove Favorite</div>
        </div>
    );
  }
});

module.exports = MessageIndexItem;
