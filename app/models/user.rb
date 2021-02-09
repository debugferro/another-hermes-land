class User < ApplicationRecord
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable, :trackable and :omniauthable
  # TODO: HASMANY RELATIONS TO THE EXTRA FEATURES
  before_save :fix_case_inputs
  after_create :create_avatar

  NATIVE_LANGUAGES = LanguageList::COMMON_LANGUAGES.map(&:name)
  COUNTRIES        = ISO3166::Country.all.map(&:name).sort

  has_many :my_languages
  has_many :my_interests
  has_many :notifications
  has_many :messages
  has_one_attached :photo
  has_many :posts
  has_many :comments
  has_one :avatar
  # has_many :assets, through: :avatar
  has_many :participants
  has_many :interests, through: :my_interests
  has_many :languages, through: :my_languages
  has_many :chat_rooms, through: :participants

  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :validatable

  validates :first_name, :last_name,
            presence: true,
            format: { with: /[a-z\s.-]/i },
            length: { minimum: 3, maximum: 15 }
  validates :username, presence: true, format: { with: /\A[A-Za-z0-9_-]*\z/ }
  validates :country, inclusion: { in: COUNTRIES }
  validates :native_language, inclusion: { in: NATIVE_LANGUAGES }

  include PgSearch::Model
  pg_search_scope :global_search,
                  against: [:username, :country, :about_me, :native_language],
                  associated_against: {
                    languages: [:name],
                    interests: [:name]
                  },
                  using: {
                    tsearch: { prefix: true }
                  }
  pg_search_scope :language_search,
                  against: [:native_language],
                  associated_against: {
                    languages: [:name]
                  },
                  using: {
                    tsearch: { prefix: true }
                  }
  pg_search_scope :interest_search,
                  associated_against: {
                    interests: [:name]
                  },
                  using: {
                    tsearch: { prefix: true }
                  }

  def fix_case_inputs
    self.first_name = first_name.capitalize if first_name
    self.last_name  = last_name.capitalize if last_name
    self.username   = username.downcase if username
  end

  def create_avatar
    Avatar.create!(user_id: self.id)
  end

  def self.find_resolve_all(users)
    found_users = []
    users.each do |user|
      if Integer(user, exception: false)
        user_record = User.find(user.to_i).id rescue nil
      else
        user_record = User.where(username: user).first&.id
      end
      return false unless user_record.is_a? Integer

      found_users << user_record
    end
    found_users
  end
end
