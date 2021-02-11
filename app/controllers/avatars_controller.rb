class AvatarsController < ApplicationController
  require 'open-uri'
  before_action :set_user, only: [:index, :update]
  before_action :set_avatar, only: [:index, :update]
  # before_action :set_default_assets, only: [:index, :update]

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

      photo = Cloudinary::Uploader.upload(avatar_params[:img])
      binding.pry
      photo = open(photo['url'])
      @user.photo.attach(io: photo, filename: 'teste')
      @avatar.assets.destroy_all
      @assets = params[:avatar][:assets].split(',')
      @assets.each do |asset|
        @avatar.assets << Asset.find(asset.to_i)
      end
      colors = JSON.parse(params[:avatar][:colors]).symbolize_keys
      colors.each { |key, value| @avatar[key] = value }
      @user.save
      @avatar.save
      redirect_to :root
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

  # def set_default_assets
  #   @female_defaults = []
  #   @female_defaults << Asset.where(base: 'f_:white;_face_1.png').first
  #   @female_defaults  << Asset.where(base: 'f_eyes_b_1.png').first
  #   @female_defaults  << Asset.where(base: 'f_:blond;_eyebrows_5.png').first
  #   @female_defaults  << Asset.where(base: 'f_mouth_1.png').first
  #   @female_defaults  << Asset.where(base: 'f_:white;_nose_1.png').first
  #   @female_defaults  << Asset.where(base: 'f_:blond;_hair_1.png').first

  #   @male_defaults = []
  #   @male_defaults << Asset.where(base: 'm_:white;_face_1.png').first
  #   @male_defaults  << Asset.where(base: 'm_:white;_eyes_12.png').first
  #   @male_defaults  << Asset.where(base: 'm_:blond;_eyebrows_4.png').first
  #   @male_defaults  << Asset.where(base: 'm_:white;_nose_4.png').first
  #   @male_defaults  << Asset.where(base: 'n_mouth_4.png').first
  #   @male_defaults  << Asset.where(base: 'm_:blond;_hair_12.png').first
  # end

  def write_paths(assets)
    assets.map { |asset| asset.base }
  end
end
