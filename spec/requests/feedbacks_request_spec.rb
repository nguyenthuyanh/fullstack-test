require 'rails_helper'

RSpec.describe "Feedbacks", type: :request do
  let :params do
    {
      "info" => {
        first_name: Faker::Name.first_name,
        last_name: Faker::Name.last_name,
        email: Faker::Internet.email,
        messages_attributes: {
          "0": {
            content: Faker::Lorem.paragraph
          }
        }
      }
    }
  end
  let(:info) {Info.create params["info"]}

  context "when requesting a list of messages" do
    it "is request successful and should render json" do
      get "/feedback"

      expect(response).to be_successful
      expect(response.content_type).to eq("application/json")
    end
  end

  context "when requesting a message's information" do
    it "is request successful and should render json result" do
      get "/feedback/#{info.messages.try(:first).try(:id)}"

      expect(response).to be_successful
      expect(response.content_type).to eq("application/json")
    end
  end

  context "when sending a new feedback" do
    it "is create successful and should render json result" do
      post "/feedback", params: params

      expect(Info.count).to eq(1)
      expect(Message.count).to eq(1)

      expect(response).to be_successful
      expect(response.content_type).to eq("application/json")
    end

  end

  context "when an existing email send a new feedback" do
    let(:new_params) do
      {
        "info" => {
          first_name: Faker::Name.first_name,
          last_name: Faker::Name.last_name,
          email: info.email,
          messages_attributes: {
            "0": {
              content: Faker::Lorem.paragraph
            }
          }
        }
      }
    end

    it "update existing info and create a new message" do

      post "/feedback", params: new_params

      expect(Info.count).to eq(1)
      expect(info.reload.first_name).to eq(new_params["info"][:first_name])
      expect(info.reload.last_name).to eq(new_params["info"][:last_name])

      expect(info.messages.count).to eq(2)
    end
  end
end
