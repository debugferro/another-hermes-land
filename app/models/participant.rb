class Participant < ApplicationRecord
  belongs_to :user
  belongs_to :chat_room

  def self.find_user_participation(id)
    Participant.where(user_id: id).map(&:chat_room)
  end
end
