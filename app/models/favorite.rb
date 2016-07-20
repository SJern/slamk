class Favorite < ActiveRecord::Base
  validates :user_id, :fav_message_id, presence: true
  validates :user_id, uniqueness: { scope: :fav_message_id }

  belongs_to :user
  belongs_to :fav_message,
  primary_key: :id,
  foreign_key: :fav_message_id,
  class_name: 'Message'

end
