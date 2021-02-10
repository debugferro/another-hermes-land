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
end
