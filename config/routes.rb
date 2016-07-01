Rails.application.routes.draw do
  root to: 'static_pages#root'
  get 'api/guest', :to => 'api/users#createGuest'

  namespace :api, defaults: {format: :json} do

    resource :user, only: [:create]
    resource :session, only: [:create, :destroy, :show]

  end
end
