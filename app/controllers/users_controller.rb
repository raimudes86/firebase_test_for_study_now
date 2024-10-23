class UsersController < ApplicationController
  def index
    @users = User.all
  end

  def new
    @user = User.new
  end
  def create
    puts params
    @user = User.new(user_params)

    if @user.save
      render json: { status: "success" }, status: :created
    else
      render json: { status: "error", errors: @user.errors.full_messages }, status: :unprocessable_entity
    end
  end

  private

  def user_params
    params.require(:user).permit(:uid, :email)
  end
end
