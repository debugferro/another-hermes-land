class CreateAssets < ActiveRecord::Migration[6.0]
  def change
    create_table :assets do |t|
      t.string :category
      t.string :base
      t.boolean :skintonalized, default: :false
      t.string :components, array: true
      t.integer :gender, default: 0
      # male: -1
      # neutral: 0
      # female: 1

      t.timestamps
    end
  end
end
