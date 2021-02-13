class FeedController < ApplicationController
  def index
    @users = User.all
    return if current_user.avatar.photo.attached?

    redirect_to avatars_path
  end
end
