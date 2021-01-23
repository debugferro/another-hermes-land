class Api::V1::AssetsController < ActionController::Base
  def index
    if params[:category]
      @assets = Asset.where(category: params[:category])
    elsif params[:gender]
      gender = params[:gender]
      query = "gender = ? OR gender = ?"
      @faces = Asset.where(category: "base").where(query, gender, 0)
      @eyes = Asset.where(category: "eyes").where(query, gender, 0)
      @hairs = Asset.where(category: "hair").where(query, gender, 0)
      @mouths = Asset.where(category: "mouth").where(query, gender, 0)
      @eyebrows = Asset.where(category: "eyebrows").where(query, gender, 0)
      @noses = Asset.where(category: "nose").where(query, gender, 0)
      @acessories = Asset.where(category: "acessory").where(query, gender, 0)
      @clothes = Asset.where(category: "cloth").where(query, gender, 0)
      @assets = {
        faces: @faces, eyes: @eyes, hairs: @hairs,
        mouths: @mouths, eyebrows: @eyebrows, noses: @noses,
        acessories: @acessories, clothes: @clothes
      }
    end
    render json: @assets
  end
end

    # else
    #   @faces = Asset.where(category: "base")
    #   @eyes = Asset.where(category: "eyes")
    #   @hairs = Asset.where(category: "hair")
    #   @mouths = Asset.where(category: "mouth")
    #   @eyebrows = Asset.where(category: "eyebrows")
    #   @noses = Asset.where(category: "nose")
    #   @acessories = Asset.where(category: "acessory")
    #   @clothes = Asset.where(category: "cloth")
    #   @assets = {
    #     faces: @faces, eyes: @eyes, hairs: @hairs,
    #     mouths: @mouths, eyebrows: @eyebrows, noses: @noses,
    #     acessories: @acessories, clothes: @clothes
    #   }
