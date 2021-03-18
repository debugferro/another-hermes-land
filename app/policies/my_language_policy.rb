class MyLanguagePolicy < ApplicationPolicy
  class Scope < Scope
    def resolve
      scope.where(user: user)
    end
  end

  def destroy?
    user == record.user
  end

  def manage?
    user.present?
  end

  def create?
    user == record.user
  end
end
