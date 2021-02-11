class MyLanguagePolicy < ApplicationPolicy
  class Scope < Scope
    def resolve
      scope.where(user: user)
    end
  end

  def destroy?
    user == record.user
  end
end
