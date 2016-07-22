const React = require('react');
const FavoriteStore = require('../stores/favorite_store');
const FavoriteActions = require('../actions/favorite_actions');
const SessionStore = require('../stores/session_store');
const MessageStore = require('../stores/message_store');



const Favorites = React.createClass({
  getInitialState(){
    return {favorites: []};
  },
  componentDidMount(){
    this.favoriteStoreListener = FavoriteStore.addListener(this._onChange);
    FavoriteActions.fetchFavorites();
  },
  componentWillUnmount(){
    this.favoriteStoreListener.remove();
  },
  _onChange(){
    let currentUser = SessionStore.currentUser();
    this.setState({favorites: FavoriteStore.findByUser(currentUser.id)});
  },
  render(){
    let content = (
      <div>You don't have any favorites</div>
    );

    if (this.state.favorites.length > 0) {
      content = (
        <ul className="favorites-index">
        {this.state.favorites.map( (favorite) => {
          return (
            <FavoriteIndexItem key={favorite.id} favorite={favorite} />
          );
        })}
        </ul>
      );
    }

    return (
      <div className="favorite" id="show">
      {content}
      </div>
    );
  }
});


module.exports = Favorites;
