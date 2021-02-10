class MyInterest < ApplicationRecord
  belongs_to :user
  belongs_to :interest

  validates_uniqueness_of :interest_id,
                          scope: :user,
                          message: "You already inserted this interest!"
end
