class ProfileController < ApplicationController
  before_action :set_user
  before_action :handle_form, only:[:create]

  def index
    @my_interests = policy_scope(MyInterest)
    @my_languages = policy_scope(MyLanguage)
  end

  def create
    @languages_form = MyLanguagesForm.new(user: @user)
    handle_interests if strong_params[:interest_ids]
    handle_languages if strong_params[:language_ids]
    @languages_form.create
    binding.pry
    errors = @interests_form.failures if @interests_form.failures.any?
    render :index, locals: { failures: errors }
  end

  private

  def set_user
    @user = current_user
  end

  def strong_params
    params.require(:user).permit(interest_ids: [], language_ids: [])
  end

  def handle_interests
    @my_interests = MyInterest.where(user_id: @user)
    @interests_form = MyInterestsForm.new(user: @user, interests: strong_params[:interest_ids])
  end

  def handle_languages
    @my_languages = MyLanguage.where(user: @user)
    @languages_form.languages = strong_params[:language_ids]
  end

  def handle_form
    @languages_form = MyLanguagesForm.new(user: @user)
    key = strong_params[:language_ids] ? :languages : :interests
    @languages_form[key] = key == :languages ? strong_params[:language_ids] : strong_params[:interest_ids]
  end
end
