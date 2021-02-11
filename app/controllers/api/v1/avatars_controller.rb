class Api::V1::AvatarsController < ActionController::Base
  def show
    appearance = Avatar.find_avatar_appearance(params[:id])
    avatar = Avatar.find(params[:id])
    @result = {
      face: appearance[:base], eyes: appearance[:eyes], hair: appearance[:hair],
      mouth: appearance[:mouth], eyebrows: appearance[:eyebrows], nose: appearance[:nose],
      acessory: appearance[:acessory], clothe: appearance[:cloth], gender: avatar.gender,
      colorOf: { skin: avatar.skin_color, eyebrows: avatar.eyebrows_color, eyes: avatar.eyes_color,
        hair: avatar.hair_color, mouth: avatar.mouth_color, acessory: avatar.acessory_color,
        clothe: avatar.clothe_color }
    }
    render json: @result
  end
end
