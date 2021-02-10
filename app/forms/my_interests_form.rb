class MyInterestsForm
  include ActiveModel::Model

  attr_accessor :user, :interests, :failures, :my_interests

  def initialize(params = {})
    super(params)
    @user = params[:user]
    @interests = params[:interests]
    @my_interests = []
    @failures = []
  end

  def create
    @interests.reject!(&:empty?).each do |param|
      @similar_interest = Interest.where("name ILIKE ?", param).first
      # If there is no similar interests out in the world, then create a new interest
      @similar_interest ||= Interest.create(name: param)
      create_my_interest
    end
    return @failures.none?
  end

  private

  def create_my_interest
    if @similar_interest.persisted?
      interest = MyInterest.new(interest: @similar_interest, user: @user)
      interest.save
      @my_interests.push(interest)
    else
      @failures.push(@similar_interest)
    end
  end
end
