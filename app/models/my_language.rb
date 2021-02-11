class MyLanguage < ApplicationRecord
  belongs_to :user
  belongs_to :language

  LEVELS = ["Begginer", "Elementary", "Intermediate", "Advanced", "Fluent"]
  validates :level, presence: true, inclusion: { in: LEVELS }
  validates :language, presence: true, uniqueness: {
    scope: :user,
    message: "You already added this language to your profile!"
  }
end
