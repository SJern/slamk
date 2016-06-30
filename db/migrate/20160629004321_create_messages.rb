class CreateMessages < ActiveRecord::Migration
  def change
    create_table :messages do |t|
      t.integer :user_id, null: false
      t.text :body, null: false
      t.integer :room_id, null: false

      t.timestamps null: false
    end

    add_index :messages, :room_id, unique: true
  end
end
