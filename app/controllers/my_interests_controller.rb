class MyInterestsController < ApplicationController
  before_action :set_interest, only: [:destroy]

  def destroy
    authorize @my_interest
    @my_interest.destroy
    redirect_to profile_index_path
  end

  private

  def set_interest
    @my_interest = MyInterest.find(params[:id])
  end
end
