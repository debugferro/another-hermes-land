class Avatar < ApplicationRecord
  belongs_to :user
  after_create_commit :set_default_assets

  has_one_attached :photo
  has_and_belongs_to_many :assets

  def set_default_assets
    puts "THIS IS THE AVATAR NOW: #{self.assets}"
    puts "CREATING AVATAR.........................................."
    self.assets.destroy_all
    # female_defaults = []
    self.assets << Asset.where(base: 'f_:white;_face_1.png').first
    self.assets  << Asset.where(base: 'f_eyes_b_1.png').first
    self.assets  << Asset.where(base: 'f_:blond;_eyebrows_5.png').first
    self.assets  << Asset.where(base: 'f_mouth_1.png').first
    self.assets  << Asset.where(base: 'f_:white;_nose_1.png').first
    self.assets  << Asset.where(base: 'f_:blond;_hair_1.png').first
    # puts self.assets
    # puts "THIS IS THE DEFAULTS: #{female_defaults}"
    # female_defaults.each do |default|
    #   self.assets << default
    # end
    # puts ".........................................................."
    # puts "THIS IS THE AVATAR AFTER: #{self.assets}"
  end
end
