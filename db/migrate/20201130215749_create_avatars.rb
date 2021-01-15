class CreateAvatars < ActiveRecord::Migration[6.0]
  def change
    create_table :avatars do |t|
      t.references :user, null: false, foreign_key: true
      t.string :skin_color, default: "#ffffff"
      t.string :eyebrows_color, default: "#ffffff"
      t.string :eyes_color, default: ["#ffffff"], array: true
      t.string :hair_color, default: "#ffffff"
      t.string :mouth_color, default: "#ffffff"
      t.string :acessory_color, default: ["#ffffff"], array: true
      t.string :clothe_color, default: "#ffffff"

      t.timestamps
    end
  end
end
