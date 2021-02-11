class ChatRoomForm
  include ActiveModel::Model

  attr_accessor :user_ids, :chat_room

  validate :find_and_validate_users

  def initialize(params = {})
    super(params)
    @users = params[:user_ids]
    @chat_room = ChatRoom.new({ user_ids: [] })
  end

  def submit
    @chat_room.user_ids = @users
    # It will check if there isn't any room with the same participants.
    # If there is, than it will return it, and redirect to it.
    @chat_rooms = ChatRoom.there_is_any_similar(@users)
    return @chat_rooms.first if @chat_rooms.any?

    # If there isn't, then it will save the new Chatroom
    @chat_room.save
    return @chat_room
  end

  private

  def find_and_validate_users
    @users = User.find_resolve_all(user_ids)
    return if @users.present?

    errors.add(:base, "Users not found")
    @chat_room.errors.add(:users, "error: Couldn't find one or more users.
      Please make sure to type the correct username.")
  end
end
