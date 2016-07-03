class Message < ActiveRecord::Base
  validates :user_id, :body, :room_id, presence: true

  belongs_to :room
  belongs_to :user
end
