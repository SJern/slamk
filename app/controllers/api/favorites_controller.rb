class Api::FavoritesController < ApplicationController
  def index
    @fav_messages = Favorites.all
    render "api/favs/index"
  end

  def create
    @fav_message = Favorites.new(favs_params)
    @fav_message.user_id = current_user.id
    if @fav_message.save
      render "api/favs/show"
    else
      render(
        json: {
          base: ["Cannot add this message to Favorites"]
        },
        status: 401
      )
    end
  end

  def destroy
    @fav_message = Favorite.find(params[:id])
    if @fav_message.destroy
      @fav_messages = Favorite.all
      render "api/favs/index"
    else
      render(
        json: {
          base: ["Cannot remove this message from Favorites"]
        },
        status: 401
      )
    end
  end

  private

  def fav_message_params
    params.require(:favorites).permit(:fav_message_id)
  end
end
