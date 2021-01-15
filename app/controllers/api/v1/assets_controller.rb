class Api::V1::AssetsController < ActionController::Base
  def index
    if params[:category]
      @assets = Asset.where(category: params[:category])
    else
      @assets = Asset.order(category: :desc)
    end
    render json: @assets
  end
end
