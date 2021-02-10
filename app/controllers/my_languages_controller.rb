class MyLanguagesController < ApplicationController
  before_action :set_language, only: [:destroy]

  def destroy
    authorize @my_language
    @my_language.destroy
    redirect_to profile_index_path
  end

  private

  def set_language
    @my_language = MyLanguage.find(params[:id])
  end
end
