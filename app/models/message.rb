class Message < ApplicationRecord
  MESSAGE_PARAMS = [:id, :content, :info_id]

  belongs_to :info

  validates :content, presence: true
end
