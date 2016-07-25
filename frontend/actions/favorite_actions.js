const AppDispatcher = require('../dispatcher/dispatcher');
const FavoriteConstants = require('../constants/favorite_constants');
const FavoriteApiUtil = require('../util/favorite_api_util');

const FavoriteActions = {
  fetchFavorites() {
    FavoriteApiUtil.fetchFavorites(this.receiveFavorites);
  },
  createFavorite(favorite) {
    FavoriteApiUtil.createFavorite(favorite, this.receiveSingleFavorite);
  },
  updateFavorite(favorite) {
    FavoriteApiUtil.updateFavorite(favorite, this.receiveSingleFavorite);
  },
  deleteFavorite(id) {
    FavoriteApiUtil.deleteFavorite(id, this.removeFavorite);
  },

  receiveFavorites(favorites) {
    AppDispatcher.dispatch({
      actionType: FavoriteConstants.FAVORITES_RECEIVED,
      favorites: favorites
    });
  },
  receiveSingleFavorite(favorite) {
    AppDispatcher.dispatch({
      actionType: FavoriteConstants.FAVORITE_RECEIVED,
      favorite: favorite
    });
  },
  removeFavorite(favorite) {
    AppDispatcher.dispatch({
      actionType: FavoriteConstants.FAVORITE_REMOVED,
      favorite: favorite
    });
  }
};

module.exports = FavoriteActions;
