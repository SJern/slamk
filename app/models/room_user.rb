class RoomUser < ActiveRecord::Base
  validates :room_id, :user_id, presence: true
  validates :room_id, uniqueness: { scope: :user_id }

  belongs_to :room
  belongs_to :user
end
