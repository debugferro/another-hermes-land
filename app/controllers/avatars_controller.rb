class AvatarsController < ApplicationController
  require 'open-uri'
  before_action :set_user, only: %i[index update]
  before_action :set_avatar, only: %i[index update]

  def index
    @auth = form_authenticity_token
    @avatar = Avatar.where(user: current_user).first
  end

  def update
    if avatar_params[:gender]
      @avatar.change_gender(avatar_params[:gender])
      redirect_to avatars_path
    end
    return unless avatar_params[:img]

    if change_avatar
      redirect_to :root
    else # If change_avatar returns false, it will not save changes and will return a message error
      redirect_to :root, notice: "I'm sorry! Something went wrong."
    end
  end

  private

  def avatar_params
    params.require(:avatar).permit(:img, :assets, :colors, :gender)
  end

  def set_user
    @user = current_user
  end

  def set_avatar
    @avatar = Avatar.where(user_id: current_user).first
  end

  def change_avatar
    return false unless @avatar.change_assets(avatar_params[:assets])

    # It will not change colors and upload avatar picture if asset saving fails
    @avatar.change_colors(avatar_params[:colors])
    @avatar.upload_photo(avatar_params[:img])
  end
end
