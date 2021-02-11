class AddDefaultToAssets < ActiveRecord::Migration[6.0]
  def change
    add_column :assets, :default, :boolean, default: false
  end
end
