# class InterestsController < ApplicationController
#   def index
#     @interest = Interest.new
#     @interest = policy_scope(Interest)
#   end

#   def create
#     authorize @interest
#   end

#   private

#   def set_interest
#     @interest = Interest.find(params[:id])
#     authorize @interest
#   end
# end
