const React = require('react');
const FavoriteStore = require('../stores/favorite_store');
const FavoriteActions = require('../actions/favorite_actions');
const SessionStore = require('../stores/session_store');
const MessageStore = require('../stores/message_store');

const FavoriteIndexItem = require('./favorite_index_item');


const Favorites = React.createClass({
  getInitialState(){
    return {favorites: [], currentUser: ""};
  },
  componentDidMount(){
    this.favoriteStoreListener = FavoriteStore.addListener(this._onFavoriteChange);
    FavoriteActions.fetchFavorites();
    this.sessionStoreListener = SessionStore.addListener(this.forceUpdate.bind(this));
  },
  componentWillUnmount(){
    this.favoriteStoreListener.remove();
    this.sessionStoreListener.remove();
  },
  _onFavoriteChange(){
    let currentUser = SessionStore.currentUser();
    this.setState({
      favorites: FavoriteStore.findByUser(currentUser.id),
      currentUser: currentUser
    });
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
            <FavoriteIndexItem key={favorite.id} favorite={favorite} roomId={this.props.roomId} />
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
