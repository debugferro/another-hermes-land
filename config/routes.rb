Rails.application.routes.draw do
  devise_for :users, controllers: {registrations: "registrations"}
  root to: 'pages#home'

  resources :users, only: [:index, :show, :update]
  resources :profile, only: [:index, :create]
  resources :feed, only: [:index]
  resources :chat_rooms, only: [:index, :show, :create] do
    resources :participants, only: [:create]
    resources :messages, only: [:create]
  end
  resources :avatars, only: [:index, :edit, :update]
  get '/my_interests/manage', to: 'my_interests#manage'
  resources :my_interests, only: [:create, :destroy]
  resources :my_languages, only: [:create, :destroy]

  namespace :api, defaults: { format: :json } do
    namespace :v1 do
      resources :assets, only: [:index]
      resources :avatars, only: [:show]
    end
 end

end
