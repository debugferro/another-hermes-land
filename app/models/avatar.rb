class Avatar < ApplicationRecord
  belongs_to :user
  after_create_commit :find_set_default_assets

  has_one_attached :photo
  has_and_belongs_to_many :assets

  def find_set_default_assets(gender = :female)
    assets.destroy_all
    Asset.find_defaults[gender].each do |asset|
      assets.push(asset)
    end
  end

  def change_gender(new_gender)
    self.gender = new_gender
    new_gender = new_gender.to_i == 1 ? :female : :male
    find_set_default_assets(new_gender)
    save!
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
