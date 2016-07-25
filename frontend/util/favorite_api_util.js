const FavoriteApiUtil = {
  fetchFavorites(success) {
    $.ajax({
      url: 'api/favorites',
      success,
			error: function () {
			  console.log("error in FavoriteApiUtil#fetchFavorites");
			}
    });
  },
  createFavorite(favorite, success) {
    $.ajax({
      url: 'api/favorites',
      method: 'POST',
      data: { favorite },
      success,
      error: function () {
        console.log("error in FavoriteApiUtil#createFavorite");
      }
    });
  },
  updateFavorite(favorite, success) {
    $.ajax({
      url: `api/favorites/${favorite.id}`,
      method: 'PATCH',
      data: { favorite },
      success,
      error: function () {
        console.log("error in FavoriteApiUtil#updateFavorite");
      }
    });
  },
  deleteFavorite(id, success) {
    $.ajax({
      url: `api/favorites/${id}`,
      method: 'DELETE',
      success,
      error: function () {
        console.log("error in FavoriteApiUtil#deleteFavorite");
      }
    });
  }
};

module.exports = FavoriteApiUtil;
