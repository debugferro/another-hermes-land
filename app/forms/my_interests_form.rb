class MyInterestsForm
  include ActiveModel::Model

  attr_accessor :user, :interests, :failures, :my_interests, :failed

  def initialize(params = {})
    super(params)
    @user = params[:user]
    @interests = params[:interests]
    @my_interests = []
    @errors = []
    @failed = false
  end

  def create
    @interests.reject!(&:empty?).each do |param|
      @similar_interest = Interest.where("name ILIKE ?", param).first
      # If there is no similar interests out in the world, then create a new interest
      @similar_interest ||= Interest.create(name: param)
      create_my_interest
    end
    return @errors.none?
  end

  def failed?
    @failed
  end

  private

  def create_my_interest
    if @similar_interest.persisted?
      interest = MyInterest.new(interest: @similar_interest, user: @user)
      interest.save
      @failed = true unless interest.persisted?
      @my_interests.push(interest)
    else
      @failed = true
      @errors.push(@similar_interest)
    end
  end
end
