class CreateAvatars < ActiveRecord::Migration[6.0]
  def change
    create_table :avatars do |t|
      t.references :user, null: false, foreign_key: true
      t.string :skin_color, default: ["#000000"], array: true
      t.string :eyebrows_color, default: ["#000000"], array: true
      t.string :eyes_color, default: ["#000000"], array: true
      t.string :hair_color, default: ["#000000"], array: true
      t.string :mouth_color, default: ["#000000"], array: true
      t.string :acessory_color, default: ["#000000"], array: true
      t.string :clothe_color, default: ["#000000"], array: true

      t.timestamps
    end
  end
end
