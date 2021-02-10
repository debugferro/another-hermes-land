class Api::V1::AssetsController < ActionController::Base
  def index
    if params[:gender]
      gender = params[:gender]
      assets = Asset.find_all_assets(gender)
      @assets = {
        faces: assets[:base], eyes: assets[:eyes], hairs: assets[:hair],
        mouths: assets[:mouth], eyebrows: assets[:eyebrows], noses: assets[:nose],
        acessories: assets[:acessory], clothes: assets[:cloth]
      }
    end
    render json: @assets
  end
end
