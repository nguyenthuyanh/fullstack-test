Rails.application.routes.draw do
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html

  resource :feedback, only: [:new, :create]

  get "feedback", to: "feedbacks#index"
  get "feedback/:id", to: "feedbacks#show"

end
