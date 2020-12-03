class MessagesController < ApplicationController
  before_action :set_current_user, :set_chat_room

  def create
    # Create a new message for a chatroom
    @message = Message.new(message_params)
    authorize @user
    @message.user = @user
    @message.chat_room = @chat_room
    if @message.save
      ChatRoomChannel.broadcast_to(
        @chat_room,
        render_to_string(partial: "message", locals: { message: @message })
      )
      redirect_to @chat_room, anchor: "message-#{@message.id}"
    else
      render @chat_room
    end
  end

  private

  def set_current_user
    @user = current_user
  end

  def set_chat_room
    @chat_room = ChatRoom.find(params[:chat_room_id])
  end

  def message_params
    params.require(:message).permit(:content, :user_id, :chat_room_id)
  end
end
