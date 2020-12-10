class Avatar < ApplicationRecord
  belongs_to :user
  after_create :set_default_assets

  has_one_attached :photo
  has_and_belongs_to_many :assets

  def set_default_assets
    female_defaults = []
    female_defaults << Asset.where(path: 'f_:white;_face_1.png').first
    female_defaults  << Asset.where(path: 'f_:neutral;_eye_1.png').first
    female_defaults  << Asset.where(path: 'f_:blond;_eyebrows_5.png').first
    female_defaults  << Asset.where(path: 'f_:white;_mouth_1.png').first
    female_defaults  << Asset.where(path: 'f_:white;_nose_1.png').first
    female_defaults  << Asset.where(path: 'f_:blond;_hair_1.png').first
    self.assets.destroy_all
    female_defaults.each do |default|
      self.assets << default
    end
  end
end
