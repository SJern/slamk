class Api::RoomsController < ApplicationController
  def index

  end

  def create
    @room = Room.new(room_params)
    if @room.save
      render "api/rooms/show"
    else
      render json: @room.errors, status: 418
    end
  end

  def update

  end

  def destroy

  end

  private
  def room_params
    params.require(:room).permit(:title, :channel)
  end

end
