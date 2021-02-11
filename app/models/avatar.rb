class Avatar < ApplicationRecord
  belongs_to :user
  has_one_attached :photo
  has_and_belongs_to_many :assets

  after_create_commit :find_set_default_assets!

  validates_presence_of :skin_color, :eyebrows_color, :eyes_color, :hair_color,
                        :mouth_color, :acessory_color, :clothe_color
  validates :assets, presence: true, allow_nil: false
  validates :assets, length: {
    in: 6..8, message: "OOPS! You can't go out looking like this."
  }

  # The method below is destructive. It will remove all
  # avatar assets and set to default according to gender
  def find_set_default_assets!(gender = 1)
    gender = gender == 1 ? :female : :male
    assets.destroy_all
    Asset.find_defaults[gender].each do |asset|
      assets.push(asset)
    end
  end

  def change_gender(new_gender)
    self.gender = new_gender
    find_set_default_assets!(new_gender.to_i)
    save!
  end

  def upload_photo(img)
    file = Cloudinary::Uploader.upload(img)
    file = URI.open(file['url'])
    photo.attach(io: file, filename: "avatar_#{id}")
  end

  def change_assets(new_assets)
    new_assets = new_assets.split(',').map(&:to_i)
    assets.destroy_all
    new_assets.map! do |asset_id|
      Asset.find(asset_id)
    end
    return true if update(assets: new_assets)
  rescue ActiveRecord::RecordNotFound
    find_set_default_assets!(gender)   # If an non existant ID is passed, it will return false and
    return false                       # set the avatar appearance to default
  end

  def change_colors(colors)
    colors = JSON.parse(colors).symbolize_keys
    colors.each { |key, value| update("#{key}": value) }
  end

  def self.find_avatar_appearance(id)
    result = {}
    avatar = find(id)
    assets = avatar.assets
    Asset::CATEGORIES.each do |category|
      result[category.to_sym] = assets.where(category: category).first
    end
    result
  end
end
