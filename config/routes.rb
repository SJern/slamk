Rails.application.routes.draw do
  root to: 'static_pages#root'
  get 'api/guest', :to => 'api/users#createGuest'

  namespace :api, defaults: {format: :json} do
    resources :messages, only: [:index, :create, :update, :destroy]
    resources :room_users, only: [:create, :destroy]
    resources :rooms, only: [:index, :create, :update, :destroy]
    resource :user, only: [:create]
    resource :session, only: [:create, :destroy, :show]
  end
end
