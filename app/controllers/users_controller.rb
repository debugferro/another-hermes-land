class UsersController < ApplicationController
  before_action :verify_presence_and_set, only: [:index]
  before_action :set_user, only: [:update]
  before_action :fix_inputs, only: [:index]

  def index
    @results = []
    return unless params[:query].present?

    search_for_all

    @results = @results.flatten.uniq
  end

  def show
    @user = User.find(params[:id])
    @chat_room = ChatRoom.new
    @my_languages = MyLanguage.where(user_id: @user)
  end

  def update
  end

  private

  def set_user
    @user = current_user
  end

  def search_for_all
    @interests.each do |interest|
      @results << User.interest_search(interest).to_a
    end
    @languages.each do |language|
      @results << User.language_search(language).to_a
    end
    @countries.each do |country|
      @results << User.global_search(country).to_a
    end
  end

  def verify_presence_and_set
    @interests = params[:query][:interests]
    @countries = params[:query][:countries]
    @languages = params[:query][:languages]
    @text = params[:query][:text] if params[:query][:text].present?
  end

  def fix_inputs
    params[:query][:interests].reject!(&:empty?)
    params[:query][:countries].reject!(&:empty?)
    params[:query][:languages].reject!(&:empty?)
  end
end
