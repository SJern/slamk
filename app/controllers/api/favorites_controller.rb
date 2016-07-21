class Api::FavoritesController < ApplicationController
  def index
    @fav_messages = Favorite.all
    render "api/favorites/index"
  end

  def create
    @fav_message = Favorite.new(fav_message_params)
    @fav_message.user_id = current_user.id
    if @fav_message.save
      render :show
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
    @fav_message = Favorite.find_by(fav_message_id: params[:id], user_id: current_user.id)
    if @fav_message.destroy
      @fav_messages = Favorite.all
      render "api/favorites/index"
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
    params.require(:favorite).permit(:user_id, :fav_message_id)
  end
end
