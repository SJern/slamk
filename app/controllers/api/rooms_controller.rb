class Api::RoomsController < ApplicationController
  def index
    @rooms = current_user.rooms
    render "api/rooms/index"
  end

  def create
    @room = Room.new(room_params)
    if @room.save
      render "api/rooms/show"
    else
      render json: @room.errors, status: 418
    end
  end

  def show_room
    @room = Room.find_by(title: params[:room_title])
    p current_user.rooms
    if @room && current_user.rooms.include?(@room)
      render "api/rooms/show"
    else
      render(
        json: {
          base: ["Invalid room title"]
        },
        status: 401
      )
    end
  end

  def destroy
    @room = Room.find(params[:id])
    @room.destroy
    render "api/rooms/show"
  end

  private
  def room_params
    params.require(:room).permit(:title, :channel)
  end

end
