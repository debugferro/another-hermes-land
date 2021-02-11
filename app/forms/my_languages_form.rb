class MyLanguagesForm
  include ActiveModel::Model

  attr_accessor :user, :languages, :success, :my_languages

  def initialize(params = {})
    super(params)
    @user = params[:user]
    @languages = params[:languages]
    @my_languages = []
    @success = true
  end

  def create
    # Reject empty variables in the array, find language, and associate to user
    @languages.reject!(&:empty?).each do |language|
      @language = Language.find_by(name: language)
      create_my_language
    end
    return @success
  end

  private

  def create_my_language
    language = MyLanguage.new(language: @language, user: @user, level: "Begginer")
    language.save
    @my_languages.push(language)
    @success = false if language.errors.any?
  end
end
