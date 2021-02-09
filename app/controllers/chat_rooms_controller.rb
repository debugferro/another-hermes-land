class ChatRoomsController < ApplicationController
  before_action :set_present_chats, only: [:index]
  before_action :fix_params, only: [:create]
  before_action :set_user
  before_action :set_present_chats, only: [:create, :show, :index]

  def index
    # Where it is going to display all chatrooms for current user
    @chat_room = ChatRoom.new
    authorize @chat_room
  end

  def show
    @chat_room = ChatRoom.find(params[:id])
    authorize @chat_room
    @participants = @chat_room.users
    @messages = @chat_room.messages
    @new_message = Message.new
    @user = current_user
  end

  def create
    puts params[:chat_room]
    @chat_room_form = ChatRoomForm.new(user_ids: params[:chat_room][:user_ids].push(@user.id))
    if @chat_room_form.valid?
      @chat_room = @chat_room_form.submit
      redirect_to @chat_room
      return
    end
    @chat_room = @chat_room_form.chat_room
    render :index
  end

  def destroy
    # It will destroy a MULTIPLE chatroom only
  end

  private

  def set_present_chats
    @present_chats = []
    Participant.where(user_id: current_user).each do |participant|
      @present_chats << participant.chat_room
    end
  end

  def fix_params
    params[:chat_room][:user_ids].reject!(&:empty?)
  end

  def set_user
    @user = current_user
  end

  def chat_room_params
    params.require(:chat_room).permit(user_ids: [])
  end

  def number?(string)
    true if Float(string) rescue false
  end
end
