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
    if @room && (general?(@room) || a_member_of(@room))
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

  def general?(room)
    room.title == "general"
  end

  def a_member_of(room)
    current_user.rooms.include?(room)
  end
end
