class Api::RoomUsersController < ApplicationController
  def create
    @room_user = RoomUser.new(room_user_params)
    @room_user.user_id = current_user.id
    @room = Room.find_by(id: room_user_params[:room_id])
    if @room && @room_user.save
      render "api/rooms/show"
    else
      render json: @room_user.errors, status: 418
    end
  end

  def destroy
  end

  private
  def room_user_params
    params.require(:room_user).permit(:room_id)
  end
end