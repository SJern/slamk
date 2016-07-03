class RemoveRoomIdConstraint < ActiveRecord::Migration
  def change
    remove_index :messages, :room_id
    add_index :messages, :room_id
  end
end
