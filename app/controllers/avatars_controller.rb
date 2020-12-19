class AvatarsController < ApplicationController
  require 'open-uri'
  before_action :set_user, only: [:index, :update]
  before_action :set_avatar, only: [:index, :update]
  before_action :set_default_assets, only: [:index, :update]

  def index
    @avatar = Avatar.where(user: current_user).first
    if @user.avatar
      @base = @user.avatar.assets.where(category: "base").first&.path
      @eye = @user.avatar.assets.where(category: "eyes").first&.path
      @hair = @user.avatar.assets.where(category: "hair").first&.path
      @mouth = @user.avatar.assets.where(category: "mouth").first&.path
      @eyebrow = @user.avatar.assets.where(category: "eyebrows").first&.path
      @nose = @user.avatar.assets.where(category: "nose").first&.path
      @acessory = @user.avatar.assets.where(category: "acessory").first&.path
      @cloth = @user.avatar.assets.where(category: "cloth").first&.path
      @gender = @user.avatar.gender
    end

    @bases = write_paths(Asset.where(category: "base", colorized: false))
    @base_colors = write_paths(Asset.where(category: "base", colorized: true))
    @eyes = write_paths(Asset.where(category: "eyes", colorized: false))
    @eye_colors = write_paths(Asset.where(category: "eyes", colorized: true))
    @hairs = write_paths(Asset.where(category: "hair", colorized: false))
    @colorized_hairs = write_paths(Asset.where(category: "hair", colorized: true))
    @mouths = write_paths(Asset.where(category: "mouth"))
    @eyebrows = write_paths(Asset.where(category: "eyebrows", colorized: false))
    @eyebrow_colors = write_paths(Asset.where(category: "eyebrows", colorized: true))
    @noses = write_paths(Asset.where(category: "nose"))
    @acessories = write_paths(Asset.where(category: "acessory", colorized: false))
    @acessory_colors = write_paths(Asset.where(category: "acessory", colorized: true))
    @clothes = write_paths(Asset.where(category: "cloth", colorized: false))
  end

  def create

  end

  def edit

  end

  def update
    if params[:avatar][:gender]
      case params[:avatar][:gender]
      when "male"
        @avatar.gender = "m"
        @avatar.assets.destroy_all

        @male_defaults.each do |default|
          @avatar.assets << default
        end
      when "female"
        @avatar.gender = "f"
        @avatar.assets.destroy_all

        @female_defaults.each do |default|
          @avatar.assets << default
        end
      end
      @avatar.save
      redirect_to avatars_path
    end
    unless params[:avatar][:img].blank?
      photo = Cloudinary::Uploader.upload(params[:avatar][:img])
      photo = open(photo['url'])
      @user.photo.attach(io: photo, filename: 'teste')
      @avatar.assets.destroy_all
      @assets = params[:avatar][:appearance].split(',')
      @assets.each do |asset|
        asset_found = Asset.where(path: asset)
        @avatar.assets << asset_found
      end
      raise
      @user.save
      @avatar.save
      redirect_to :root
    end
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
    @female_defaults << Asset.where(path: 'f_:white;_face_1.png').first
    @female_defaults  << Asset.where(path: 'f_:neutral;_eye_1.png').first
    @female_defaults  << Asset.where(path: 'f_:blond;_eyebrows_5.png').first
    @female_defaults  << Asset.where(path: 'f_:white;_mouth_1.png').first
    @female_defaults  << Asset.where(path: 'f_:white;_nose_1.png').first
    @female_defaults  << Asset.where(path: 'f_:blond;_hair_1.png').first

    @male_defaults = []
    @male_defaults << Asset.where(path: 'm_:white;_face_1.png').first
    @male_defaults  << Asset.where(path: 'm_:white;_eyes_12.png').first
    @male_defaults  << Asset.where(path: 'm_:blond;_eyebrows_4.png').first
    @male_defaults  << Asset.where(path: 'm_:white;_nose_4.png').first
    @male_defaults  << Asset.where(path: 'n_:white;_mouth_4.png').first
    @male_defaults  << Asset.where(path: 'm_:blond;_hair_12.png').first
  end

  def write_paths(assets)
    assets.map { |asset| asset.path }
  end
end
    # avatar << Asset.where(path: 'f_:white;_face_1.png').first
    # avatar  << Asset.where(path: 'f_:neutral;_eye_1.png').first
    # avatar  << Asset.where(path: 'f_:blond;_eyebrows_5.png').first
    # avatar  << Asset.where(path: 'f_:white;_nose_1.png').first
    # avatar  << Asset.where(path: 'f_:white;_mouth_1.png').first
    # avatar  << Asset.where(path: 'f_:blond;_hair_1.png').first
