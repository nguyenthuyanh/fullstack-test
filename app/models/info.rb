class Info < ApplicationRecord
  INFO_PARAMS = [:first_name, :last_name, :email, messages_attributes: Message::MESSAGE_PARAMS]

  has_many :messages

  accepts_nested_attributes_for :messages, reject_if: proc { |attributes| attributes['content'].blank? }

  validates :first_name, :last_name, :email, :messages, presence: true
  validates :email, format: {with: /\A(.+)@(.+)\z/, message: "is not valid"}
end
