class CreateRooms < ActiveRecord::Migration
  def change
    create_table :rooms do |t|
      t.string :title, null: false
      t.boolean :channel, null: false

      t.timestamps null: false
    end

    add_index :rooms, :title, unique: true
    add_index :rooms, :channel
  end
end
