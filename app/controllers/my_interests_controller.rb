class MyInterestsController < ApplicationController
  before_action :set_interest, only: [:destroy]

  def manage
    @my_interests = policy_scope(MyInterest)
    authorize MyInterest.new
  end

  def create
    @interests_form = MyInterestsForm.new(
      user: current_user, interests: strong_params[:interest_ids]
    )
    puts @interests_form.create
    errors = []
    if @interests_form.failed?
      errors << @interests_form.errors || @interests_form.my_interests.map { |i| i.errors.full_messages }.flatten
    end
    render :new, locals: { failures: errors }
  end

  def destroy
    authorize @my_interest
    @my_interest.destroy
    redirect_to profile_index_path
  end

  private

  def strong_params
    params.require(:my_interest).permit(interest_ids: [])
  end

  def set_interest
    @my_interest = MyInterest.find(params[:id])
  end
end
