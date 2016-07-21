const AppDispatcher = require('../dispatcher/dispatcher.js');
const Store = require('flux/utils').Store;
const FavoriteConstants = require('../constants/favorite_constants');

const FavoriteStore = new Store(AppDispatcher);

let _favorites = {};

FavoriteStore.all = function() {
  return Object.keys(_favorites).map ( key => {
    return _favorites[key];
  });
};

FavoriteStore.findByUser = function(userId) {
  let _userFavorites = [];
  Object.keys(_favorites).forEach( key => {
    if (_favorites[key].user_id === userId) {
      _userFavorites.push(_favorites[key]);
    }
  });
  return _userFavorites;
};

// FavoriteStore.findFavorited = function(userId, favMessageId){
//   Object.keys(_favorites).forEach( (favoriteId) => {
//     if (_favorites[favoriteId].fav_message_id === favMessageId && _favorites[favoriteId].user_id === userId) {
//       return _favorites[favoriteId];
//     }
//   });
// };

FavoriteStore.findFavorited = function(favMessageId, userId){
  Object.keys(_favorites).forEach ( (key) => {
    if (_favorites[key].fav_message_id === favMessageId && _favorites[key].user_id === userId) {
      return _favorites[key];
    }
  });
};

const resetFavorites = function(favorites) {
  _favorites = {};
  favorites.forEach( (favorite) => {
    _favorites[favorite.id] = favorite;
  });
};

const setFavorite = function(favorite) {
  _favorites[favorite.id] = favorite;
};

const deleteFavorite = function(favorite) {
  delete _favorites[favorite.id];
};

FavoriteStore.__onDispatch = payload => {
  switch (payload.actionType) {
    case FavoriteConstants.FAVORITES_RECEIVED:
      resetFavorites(payload.favorites);
      FavoriteStore.__emitChange();
      break;
    case FavoriteConstants.FAVORITE_RECEIVED:
      setFavorite(payload.favorite);
      FavoriteStore.__emitChange();
      break;
    case FavoriteConstants.FAVORITE_REMOVED:
      deleteFavorite(payload.favorite);
      FavoriteStore.__emitChange();
      break;

  }
};

module.exports = FavoriteStore;
