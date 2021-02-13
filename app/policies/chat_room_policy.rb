class ChatRoomPolicy < ApplicationPolicy
  class Scope < Scope
    def resolve
      scope.all
    end
  end

  def index?
    user.avatar.photo.attached?
  end


  def show?
    user == record.users && user.photo.attached?
    if record.users.where(id: user.id).present?
      true
    else
      false
    end
  end

  def create?
    true
  end

end
