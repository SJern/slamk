class CreateFavorites < ActiveRecord::Migration
  def change
    create_table :favorites do |t|
      t.integer :user_id, null: false
      t.integer :fav_message_id, null: false
      t.timestamps null: false
    end
    add_index :favorites, :user_id
    add_index :favorites, :fav_message_id
  end
end
