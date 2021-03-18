class MyLanguagesForm
  include ActiveModel::Model

  attr_accessor :user, :languages, :failed, :my_languages, :errors

  def initialize(params = {})
    super(params)
    @user = params[:user]
    @languages = params[:languages]
    @my_languages = []
    @errors = []
    @failed = false
  end

  def create
    # Reject empty variables in the array, find language, and associate to user
    @languages.reject!(&:empty?).each do |language|
      @language = Language.find_by(name: language)
      create_my_language
    end
    return !@failed
  end

  def failed?
    @failed
  end

  private

  def create_my_language
    language = MyLanguage.new(language: @language, user: @user, level: "Begginer")
    language.save
    @my_languages.push(language)
    return unless language.errors.any?

    @failed = true
    @errors = language.errors.full_messages
  end
end
