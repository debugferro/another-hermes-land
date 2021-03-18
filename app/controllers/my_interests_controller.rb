class MyInterestsController < ApplicationController
  before_action :set_interest, only: [:destroy]
  after_action :clean_errors, only: [:manage]

  def manage
    @my_interests = policy_scope(MyInterest)
    @interests = Interest.all
    @errors ||= session[:errors]&.flatten
    authorize MyInterest.new
  end

  def create
    @interests_form = MyInterestsForm.new(
      user: current_user, interests: strong_params[:interest_ids]
    )
    @interests_form.create
    errors = []
    if @interests_form.failed?
      puts 'failed'
      errors << @interests_form.errors || @interests_form.my_interests.map { |i| i.errors.full_messages }.flatten
      session[:errors] = errors
      redirect_to my_interests_manage_path and return
    end
    redirect_to my_languages_manage_path
  end

  def destroy
    authorize @my_interest
    @my_interest.destroy
    redirect_to my_interests_manage_path
  end

  private

  def clean_errors
    session[:errors] = nil
  end

  def strong_params
    params.require(:user).permit(interest_ids: [])
  end

  def set_interest
    @my_interest = MyInterest.find(params[:id])
  end
end
