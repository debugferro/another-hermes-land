Rails.application.routes.draw do
  devise_for :users, controllers: {registrations: "registrations"}
  root to: 'pages#home'

  resources :users, only: [:index, :show, :update]
  get '/profile', to: 'users#profile'
  resources :feed, only: [:index]
  resources :chat_rooms, only: [:index, :show, :create] do
    resources :participants, only: [:create]
    resources :messages, only: [:create]
  end
  resources :avatars, only: [:index, :edit, :update]
  resources :interests, only: [:index, :show, :create, :update]
  resources :my_interests, only: [:index, :create, :update, :destroy]
  resources :my_languages, only: [:index, :create, :update, :destroy]

  namespace :api, defaults: { format: :json } do
    namespace :v1 do
      resources :assets, only: [:index]
    end
 end

end
