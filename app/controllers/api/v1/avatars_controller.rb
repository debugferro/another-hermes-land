class Api::V1::AvatarsController < ActionController::Base
  def show
    @avatar = Avatar.find(params[:id])
    @assets = @avatar.assets
    @result = {
      face: @assets.where(category: "base").first, eyes: @assets.where(category: "eyes").first,
      hair: @assets.where(category: "hair").first, mouth: @assets.where(category: "mouth").first,
      eyebrows: @assets.where(category: "eyebrows").first, nose: @assets.where(category: "nose").first,
      acessory: @assets.where(category: "acessory").first, clothe: @assets.where(category: "cloth").first,
      gender: @avatar.gender, colorOf: {
        skin: @avatar.skin_color, eyebrows: @avatar.eyebrows_color, eyes: @avatar.eyes_color,
        hair: @avatar.hair_color, mouth: @avatar.mouth_color, acessory: @avatar.acessory_color,
        clothe: @avatar.clothe_color
      }
    }
    render json: @result
  end
end
