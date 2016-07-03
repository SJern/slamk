class Api::MessagesController < ApplicationController
  def index
    @room = Room.find(params[:room_id])
    @messages = @room.messages
    render "api/messages/index"
  end

  def create
    @message = Message.new(message_params)
    @message.user_id = current_user.id
    if @message.save
      render "api/messages/show"
    else
      render json: @message.errors, status: 418
    end
  end

  def update

  end

  def destroy

  end

  private

  def message_params
    params.require(:message).permit(:body, :room_id)
  end

end
