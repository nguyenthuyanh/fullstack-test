class FeedbacksController < ApplicationController
  def new
  end

  def create
    info = Info.find_or_initialize_by email: info_params[:email]
    info.assign_attributes info_params

    if info.save
      render json: {success: "Created Successfully"}, status: :created
    else
      render json: {errors: info.errors.full_messages}
    end
  end

  def index
    messages ||= if params[:p] && params[:n]
      Message.paginate page: params[:p].to_i, per_page: params[:n].to_i
    else
      Message.all
    end
    render json: messages
  end

  def show
    message = Message.find_by id: params[:id]
    render json: message
  end

  private
  def info_params
    @info_params ||= params.require(:info).permit Info::INFO_PARAMS
  end
end
