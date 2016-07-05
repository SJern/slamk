
class Api::UsersController < ApplicationController
  def create
    @user = User.new(user_params)
    @user.guest = false
    if @user.save
      login(@user)
      render "api/users/show"
    else
      render json: @user.errors, status: 422
    end
  end

  def create_guest
    @user = User.new(guest_params)
    @user.guest = true
    if @user.save
      login(@user)
      render "api/users/show"
    else
      render json: @user.errors, status: 422
    end
  end

  private

  def user_params
    params.require(:user).permit(:username, :password, :fname, :lname, :email)
  end

  def guest_params
    begin
      username = [Faker::StarWars.character.downcase.split.shuffle.join("_"),
        Faker::StarWars.droid].shuffle.join("_")
    end while User.find_by(username: username)
    fname = Faker::StarWars.character.scan(/\A\w+/).first
    lname = Faker::StarWars.character.scan(/\w+\z/).first
    email = [username, "@parks&app.com"].join

    return {
      "username"=>username,
      "password"=>"123456",
      "fname"=>fname,
      "lname"=>lname,
      "email"=>email
    }
  end
end
