class UsersController < ApplicationController
  before_action :verify_presence_and_set, only: [:index]
  before_action :set_user, only: [:update]
  before_action :fix_inputs, only: [:index]

  def index
    @results = []
    if params[:query].present?
      @results << User.global_search(@text).to_a if @text
      if @interests
        @interests.each do |interest|
          @results << User.interest_search(interest).to_a
        end
      end
      if @languages
        @languages.each do |language|
          @results << User.language_search(language).to_a
        end
      end
      if @countries
        @countries.each do |country|
          @results << User.global_search(country).to_a
        end
      end
      @results = @results.flatten.uniq
    end

    # DIFFERENT WAY OF DOING

    # if params[:query].present?
    #   @results = []
    #   @results << User.global_search(@text).to_a if @text
    #   if @interests
    #     @interests.each do |interest|
    #       @results << User.interest_search(interest).to_a
    #     end
    #   end
    # end
    # @results = @results.flatten.uniq
  end

  def show
    @user = User.find(params[:id])
    @chat_room = ChatRoom.new
    @my_languages = MyLanguage.where(user_id: @user)
  end

  def update
    # require 'open-uri'
    # if params[:user][:avatar]
    #   photo = Cloudinary::Uploader.upload(params[:user][:avatar])
    #   photo = open(photo['url'])
    #   @user.photo.attach(io: photo, filename: 'teste')
    # end
    # @user.save
    # redirect_to :root
  end

  private

  def set_user
    @user = current_user
  end

  def verify_presence_and_set
    @interests = params[:query][:interests]
    @countries = params[:query][:countries]
    @languages = params[:query][:languages]
    @text = params[:query][:text] if params[:query][:text].present?
  end

  def fix_inputs
    params[:query][:interests].reject!(&:empty?) if @interests
    params[:query][:countries].reject!(&:empty?) if @countries
    params[:query][:languages].reject!(&:empty?) if @languages
  end

end
