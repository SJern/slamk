class Room < ActiveRecord::Base
  validates :title, presence: true
  validates :channel, inclusion: { in: [true, false] }
  validates :title, uniqueness: true

  has_many :messages, dependent: :destroy
  has_many :room_users, dependent: :destroy
  has_many :users,
    through: :room_users,
    source: :user
end
