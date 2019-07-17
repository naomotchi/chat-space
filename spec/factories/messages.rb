FactoryBot.define do
  factory :message do
    text { Faker::Lorem.sentence}
    image {File.open("#{Rails.root}/public/images/tatetoken_hiyoko.png")}
    user
    group
  end
end