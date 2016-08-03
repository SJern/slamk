class Api::MessagesController < ApplicationController
  def index
    @room = Room.find(params[:room_id])
    @messages = @room.messages
    render "api/messages/index"
  end

  def allmessages
    @messages = Message.all
    render "api/messages/favorites.json.jbuilder"
  end

  def create
    @message = Message.new(message_params)
    @message.user_id = current_user.id
    if @message.save
      Pusher.trigger("room_#{@message.room_id}", 'message_created', {
        message: @message,
        username: current_user.username
      })
      render "api/messages/show"
    else
      render json: @message.errors, status: 418
    end
  end

  def update
    @message = Message.find(params[:id])
    if @message.update(message_params)
      render "api/messages/show"
    else
      render json: @message.errors, status: 418
    end
  end

  def destroy
    @message = Message.find(params[:id])
    @message.destroy
    render "api/messages/show"
  end

  private

  def message_params
    params.require(:message).permit(:body, :room_id)
  end

end
