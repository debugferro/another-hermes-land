class Avatar < ApplicationRecord
  belongs_to :user
  after_create_commit :set_default_assets

  has_one_attached :photo
  has_and_belongs_to_many :assets

  def set_default_assets
    self.assets.destroy_all
    self.assets << Asset.where(base: 'f_:white;_face_1.png').first
    self.assets  << Asset.where(base: 'f_eyes_b_1.png').first
    self.assets  << Asset.where(base: 'f_:blond;_eyebrows_5.png').first
    self.assets  << Asset.where(base: 'f_mouth_1.png').first
    self.assets  << Asset.where(base: 'f_:white;_nose_1.png').first
    self.assets  << Asset.where(base: 'f_:blond;_hair_1.png').first
  end
end
