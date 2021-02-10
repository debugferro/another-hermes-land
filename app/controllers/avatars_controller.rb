class AvatarsController < ApplicationController
  require 'open-uri'
  before_action :set_user, only: [:index, :update]
  before_action :set_avatar, only: [:index, :update]
  before_action :set_default_assets, only: [:index, :update]

  def index
    @auth = form_authenticity_token
    @avatar = Avatar.where(user: current_user).first
  end

  def update
    if params[:avatar][:gender]
      case params[:avatar][:gender].to_i
      when -1
        @avatar.gender = -1
        @avatar.assets.destroy_all

        @male_defaults.each do |default|
          @avatar.assets << default
        end
      when 1
        @avatar.gender = 1
        @avatar.assets.destroy_all

        @female_defaults.each do |default|
          @avatar.assets << default
        end
      end
      @avatar.save
      redirect_to avatars_path
    end
    return unless params[:avatar][:img]
      photo = Cloudinary::Uploader.upload(params[:avatar][:img])
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
    params.require(:avatar).permit(:name, :base, :eyes, :mouth, :hair, :photo)
  end

  def set_user
    @user = current_user
  end

  def set_avatar
    @avatar = Avatar.where(user_id: current_user).first
  end

  def set_default_assets
    @female_defaults = []
    @female_defaults << Asset.where(base: 'f_:white;_face_1.png').first
    @female_defaults  << Asset.where(base: 'f_eyes_b_1.png').first
    @female_defaults  << Asset.where(base: 'f_:blond;_eyebrows_5.png').first
    @female_defaults  << Asset.where(base: 'f_mouth_1.png').first
    @female_defaults  << Asset.where(base: 'f_:white;_nose_1.png').first
    @female_defaults  << Asset.where(base: 'f_:blond;_hair_1.png').first

    @male_defaults = []
    @male_defaults << Asset.where(base: 'm_:white;_face_1.png').first
    @male_defaults  << Asset.where(base: 'm_:white;_eyes_12.png').first
    @male_defaults  << Asset.where(base: 'm_:blond;_eyebrows_4.png').first
    @male_defaults  << Asset.where(base: 'm_:white;_nose_4.png').first
    @male_defaults  << Asset.where(base: 'n_mouth_4.png').first
    @male_defaults  << Asset.where(base: 'm_:blond;_hair_12.png').first
  end

  def write_paths(assets)
    assets.map { |asset| asset.base }
  end
end
