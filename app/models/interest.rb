class Interest < ApplicationRecord
  has_many :my_interests
  before_save :fix_case_inputs

  validates :name, length: { in: 2..20 }, presence: true

  def fix_case_inputs
    self.name = name.capitalize if name
  end
end
