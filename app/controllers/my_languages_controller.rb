class MyLanguagesController < ApplicationController
  before_action :set_language, only: [:destroy]
  after_action :clean_errors, only: [:manage]

  def manage
    @my_languages = policy_scope(MyLanguage)
    @interests = Language.all
    @errors ||= session[:errors]&.flatten
    authorize MyLanguage.new
  end

  def create
    puts params
    @languages_form = MyLanguagesForm.new(
      user: current_user, languages: strong_params[:language_ids]
    )
    redirect_to feed_index_path and return if @languages_form.create

    session[:errors] = @languages_form.errors
    redirect_to my_languages_manage_path
  end

  def destroy
    authorize @my_language
    @my_language.destroy
    redirect_to my_languages_manage_path
  end

  private

  def clean_errors
    session[:errors] = nil
  end

  def strong_params
    params.require(:user).permit(language_ids: [])
  end

  def set_language
    @my_language = MyLanguage.find(params[:id])
  end
end
