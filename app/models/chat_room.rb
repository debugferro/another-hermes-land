class ChatRoom < ApplicationRecord
  has_many :participants, dependent: :destroy
  has_many :users, through: :participants
  has_many :messages

  after_create :create_participants

  attr_accessor :user_ids

  def self.there_is_any_similar(user_ids)
    query = 'ARRAY[?::bigint] = ARRAY_AGG(participants.user_id ORDER BY participants.user_id ASC)'
    chatroom = ChatRoom.joins(:participants).group('chat_rooms.id').having(query, user_ids.sort)
    return chatroom
  end

  def create_participants
    user_ids.each do |user_id|
      Participant.create!(user_id: user_id, chat_room_id: self.id)
    end
  end
end
