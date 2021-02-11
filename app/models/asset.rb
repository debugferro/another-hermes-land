class Asset < ApplicationRecord
  has_and_belongs_to_many :avatars
  attribute :components, :string, array: true, default: []

  CATEGORIES = ["base", "eyes", "hair", "mouth",
                "eyebrows", "nose", "acessory", "cloth"]

  def self.find_all_assets(gender)
    result = {}
    query = "gender = ? OR gender = ?"
    CATEGORIES.each do |category|
      result[category.to_sym] = where(category: category).where(query, gender, 0)
    end
    result
  end

  def self.find_defaults
    result = { female: [], male: [] }
    CATEGORIES.each do |category|
      fem_asset = where(category: category, gender: 1, default: true).first
      masc_asset = where(category: category, gender: -1, default: true).first
      result[:female].push(fem_asset) if fem_asset
      result[:male].push(masc_asset) if masc_asset
    end
    result
  end
end
