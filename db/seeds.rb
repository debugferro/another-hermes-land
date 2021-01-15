require "faker"

Asset.destroy_all

Asset.create!(category: "base", base: "f_:white;_face_1.png")
Asset.create!(category: "base", base: "m_:white;_face_1.png")
# Asset.create!(category: "base", base: "m_:white;_face_2.png")
# Asset.create!(category: "base", base: "f_:white;_face_2.png")
# Asset.create!(category: "base", base: "f_:black;_face_1.png")
# Asset.create!(category: "base", base: "m_:black;_face_1.png")
# Asset.create!(category: "base", base: "m_:black;_face_2.png")
# Asset.create!(category: "base", base: "f_:black;_face_2.png")


# ACESSORIES            <gender>_:<color>;_<category>_<id>.png

Asset.create!(category: "acessory", base: "n_:default;_acessory_1.png")

Asset.create!(category: "acessory", base: "f_:purple;_acessory_2.png")
Asset.create!(category: "acessory", base: "f_:purple2;_acessory_2.png")
Asset.create!(category: "acessory", base: "f_:purple3;_acessory_2.png")

Asset.create!(category: "acessory", base: "f_:default;_acessory_3.png")

Asset.create!(category: "acessory", base: "m_:blond;_acessory_4.png")
Asset.create!(category: "acessory", base: "m_:black;_acessory_4.png")

Asset.create!(category: "acessory", base: "f_:pink;_acessory_5.png")
Asset.create!(category: "acessory", base: "f_:red;_acessory_5.png")

Asset.create!(category: "acessory", base: "n_:default;_acessory_6.png")
Asset.create!(category: "acessory", base: "n_:pink;_acessory_6.png")

Asset.create!(category: "acessory", base: "f_:default;_acessory_7.png")
Asset.create!(category: "acessory", base: "f_:black;_acessory_7.png")
Asset.create!(category: "acessory", base: "f_:blue;_acessory_7.png")

Asset.create!(category: "acessory", base: "f_:default;_acessory_8.png")

Asset.create!(category: "acessory", base: "f_:default;_acessory_9.png")
Asset.create!(category: "acessory", base: "f_:blue;_acessory_9.png")
Asset.create!(category: "acessory", base: "f_:yellow;_acessory_9.png")

Asset.create!(category: "acessory", base: "f_:default;_acessory_10.png")
Asset.create!(category: "acessory", base: "f_:white;_acessory_10.png")

Asset.create!(category: "acessory", base: "f_:default;_acessory_11.png")
Asset.create!(category: "acessory", base: "f_:red;_acessory_11.png")

Asset.create!(category: "acessory", base: "f_:default;_acessory_12.png")

# EYEBROWS            <gender>_:<hair color>;_<category>_<id>.png

Asset.create!(category: "eyebrows", base: "n_:blond;_eyebrows_1.png")
Asset.create!(category: "eyebrows", base: "n_:black;_eyebrows_1.png")

Asset.create!(category: "eyebrows", base: "n_:blond;_eyebrows_2.png")
Asset.create!(category: "eyebrows", base: "n_:cocoa;_eyebrows_2.png")
Asset.create!(category: "eyebrows", base: "n_:black;_eyebrows_2.png")

Asset.create!(category: "eyebrows", base: "m_:blond;_eyebrows_3.png")
Asset.create!(category: "eyebrows", base: "m_:black;_eyebrows_3.png")

Asset.create!(category: "eyebrows", base: "m_:blond;_eyebrows_4.png")

Asset.create!(category: "eyebrows", base: "f_:blond;_eyebrows_5.png")

Asset.create!(category: "eyebrows", base: "f_:blond;_eyebrows_6.png")
Asset.create!(category: "eyebrows", base: "f_:cocoa;_eyebrows_6.png")
Asset.create!(category: "eyebrows", base: "f_:black;_eyebrows_6.png")
Asset.create!(category: "eyebrows", base: "f_:red;_eyebrows_6.png")

# EYES            <gender>_:<skin color>;_<category>_<id>.png

Asset.create!(category: "eyes", base: "f_eyes_b_1.png", components: ['f_eyes_c_1.png'])

Asset.create!(category: "eyes", base: "f_eyes_2.png")

Asset.create!(category: "eyes", base: "f_eyes_3.png")

Asset.create!(category: "eyes", base: "f_:neutral;_eyes_4.png")

Asset.create!(category: "eyes", base: "f_:neutral;_eyes_5.png")

Asset.create!(category: "eyes", base: "f_:neutral;_eyes_6.png")

Asset.create!(category: "eyes", base: "f_:neutral;_eyes_7.png")

Asset.create!(category: "eyes", base: "n_:neutral;_eyes_8.png")
Asset.create!(category: "eyes", base: "n_:neutral;_eyesc_8.png")

Asset.create!(category: "eyes", base: "n_:neutral;_eyes_9.png")
Asset.create!(category: "eyes", base: "n_:neutral;_eyesc_9.png")

Asset.create!(category: "eyes", base: "f_:neutral;_eyes_10.png")
Asset.create!(category: "eyes", base: "f_:neutral;_eyesc_10.png")
Asset.create!(category: "eyes", base: "f_:neutral;_eyesc2_10.png")

Asset.create!(category: "eyes", base: "n_:neutral;_eyes_11.png")
Asset.create!(category: "eyes", base: "n_:neutral;_eyesc_11.png")

Asset.create!(category: "eyes", base: "m_:white;_eyes_12.png")

# HAIR            <gender>_:<hair_color>;_<category>_<id>.png

Asset.create!(category: "hair", base: "f_:blond;_hair_1.png")

Asset.create!(category: "hair", base: "f_:blond;_hair_2.png")
Asset.create!(category: "hair", base: "f_:cocoa;_hair_2.png")
Asset.create!(category: "hair", base: "f_:black;_hair_2.png")

Asset.create!(category: "hair", base: "f_:blond;_hair_3.png")
Asset.create!(category: "hair", base: "f_:cocoa;_hair_3.png")
Asset.create!(category: "hair", base: "f_:black;_hair_3.png")
Asset.create!(category: "hair", base: "f_:red;_hair_3.png")

Asset.create!(category: "hair", base: "f_:blond;_hair_4.png")
Asset.create!(category: "hair", base: "f_:black;_hair_4.png")
Asset.create!(category: "hair", base: "f_:cocoa;_hair_4.png")
Asset.create!(category: "hair", base: "f_:red;_hair_4.png")
Asset.create!(category: "hair", base: "f_:white;_hair_4.png")

Asset.create!(category: "hair", base: "f_:blond;_hair_5.png")
Asset.create!(category: "hair", base: "f_:cocoa;_hair_5.png")
Asset.create!(category: "hair", base: "f_:red;_hair_5.png")
Asset.create!(category: "hair", base: "f_:white;_hair_5.png")

Asset.create!(category: "hair", base: "f_:blond;_hair_6.png")
Asset.create!(category: "hair", base: "f_:cocoa;_hair_6.png")
Asset.create!(category: "hair", base: "f_:red;_hair_6.png")
Asset.create!(category: "hair", base: "f_:black;_hair_6.png")

Asset.create!(category: "hair", base: "f_:blond;_hair_7.png")

Asset.create!(category: "hair", base: "f_:blond;_hair_8.png")
Asset.create!(category: "hair", base: "f_:black;_hair_8.png")
Asset.create!(category: "hair", base: "f_:white;_hair_8.png")
Asset.create!(category: "hair", base: "f_:cocoa;_hair_8.png")

Asset.create!(category: "hair", base: "n_:blond;_hair_9.png")
Asset.create!(category: "hair", base: "n_:cocoa;_hair_9.png")
Asset.create!(category: "hair", base: "n_:black;_hair_9.png")

Asset.create!(category: "hair", base: "n_:black;_hair_10.png")
Asset.create!(category: "hair", base: "n_:blond;_hair_10.png")
Asset.create!(category: "hair", base: "n_:cocoa;_hair_10.png")

Asset.create!(category: "hair", base: "m_:blond;_hair_11.png")

Asset.create!(category: "hair", base: "m_:blond;_hair_12.png")
Asset.create!(category: "hair", base: "m_:cocoa;_hair_12.png")
Asset.create!(category: "hair", base: "m_:white;_hair_12.png")
Asset.create!(category: "hair", base: "m_:black;_hair_12.png")

Asset.create!(category: "hair", base: "m_:blond;_hair_13.png")
Asset.create!(category: "hair", base: "m_:black;_hair_13.png")

Asset.create!(category: "hair", base: "m_:blond;_hair_14.png")
Asset.create!(category: "hair", base: "m_:cocoa;_hair_14.png")
Asset.create!(category: "hair", base: "m_:black;_hair_14.png")
Asset.create!(category: "hair", base: "m_:red;_hair_14.png")

# MOUTHS            <gender>_:<skin color>;_<category>_<id>.png

Asset.create!(category: "mouth", base: "f_mouth_1.png")

Asset.create!(category: "mouth", base: "f_mouth_2.png", skintonalized: true)

Asset.create!(category: "mouth", base: "n_mouth_4.png", skintonalized: true)

Asset.create!(category: "mouth", base: "n_:neutral;_mouth_5.png")

Asset.create!(category: "mouth", base: "n_:neutral;_mouth_6.png", skintonalized: true)

# NOSES            <gender>_:<skin color>;_<category>_<id>.png

Asset.create!(category: "nose", base: "f_:white;_nose_1.png")

Asset.create!(category: "nose", base: "f_:white;_nose_2.png")

Asset.create!(category: "nose", base: "f_:white;_nose_3.png")

Asset.create!(category: "nose", base: "m_:white;_nose_4.png")

Asset.create!(category: "nose", base: "n_:white;_nose_5.png")

Asset.create!(category: "nose", base: "n_:white;_nose_6.png")

Asset.create!(category: "nose", base: "n_:white;_nose_7.png")

Asset.create!(category: "nose", base: "n_:white;_nose_8.png")

Asset.create!(category: "nose", base: "n_:white;_nose_9.png")

# CLOTHES

Asset.create!(category: "cloth", base: "n_:default;_clothes_1.png")

Asset.create!(category: "cloth", base: "n_:default;_clothes_2.png")

Asset.create!(category: "cloth", base: "n_:default;_clothes_3.png")

Asset.create!(category: "cloth", base: "n_:default;_clothes_4.png")
Asset.create!(category: "cloth", base: "n_:black;_clothes_4.png")
Asset.create!(category: "cloth", base: "n_:red;_clothes_4.png")
Asset.create!(category: "cloth", base: "n_:white;_clothes_4.png")

Avatar.destroy_all
MyLanguage.destroy_all
MyInterest.destroy_all
Language.destroy_all
Participant.destroy_all
Message.destroy_all
ChatRoom.destroy_all
User.destroy_all
selected_languages = ["English", "French", "Portuguese", "Chinese", "German"]
Language::LANGUAGES.each do | language |
 Language.create(name: language)
end

user = User.create!(
email: "testeuser1@gmail.com",
password: "123456",
username: "Gabs",
first_name: "Gabriel",
last_name:  "Ferro",
birth_date: Faker::Date.birthday(min_age: 12, max_age: 65),
about_me: "This is me, like it or not, here i come. I want to travel around the world and i trully believe that speaking as many languages as possible will help me out.",
native_language: selected_languages.sample,
country: User::COUNTRIES.sample
)

user = User.create!(
email: "testeuser2@gmail.com",
password: "123456",
username: "Filip",
first_name: "Filipe",
last_name:  "Alencar",
birth_date: Faker::Date.birthday(min_age: 12, max_age: 65),
about_me: "My name is Filipe an i am crazy about coding, thats why i want to improve my english, so i can comunicate better with people around the globe",
native_language: selected_languages.sample,
country: User::COUNTRIES.sample
)

user = User.create!(
email: "testeuser3@gmail.com",
password: "123456",
username: "Gui",
first_name: "Guilherme",
last_name:  "Lima",
birth_date: Faker::Date.birthday(min_age: 12, max_age: 65),
about_me: "I didn't ask for a free ride, I only ask you to show me a real good time. I never asked for the rainfall, at least I showed up, You showed me nothing at all",
native_language: selected_languages.sample,
country: User::COUNTRIES.sample
)

user = User.create!(
email: "testeuser4@gmail.com",
password: "123456",
username: "Mat",
first_name: "Matheus",
last_name:  "Penchel",
birth_date: Faker::Date.birthday(min_age: 12, max_age: 65),
about_me: "I´m a computers enthusiast and love studying about it. Now, i´ve decide to try something new and learn a new language, to challenge other parts of my brain",
native_language: selected_languages.sample,
country: User::COUNTRIES.sample
)

user = User.create!(
email: "testeuser5@gmail.com",
password: "123456",
username: "Tatchi",
first_name: "Tabata",
last_name:  "Wiggers",
birth_date: Faker::Date.birthday(min_age: 12, max_age: 65),
about_me: "I´m passionate about nature, specially dogs. I really like to travel and experience cultures as locals, thats why i want to improve my language skills, to speak the native language wherever i go.",
native_language: selected_languages.sample,
country: User::COUNTRIES.sample
)

user = User.create!(
email: "testeuser6@gmail.com",
password: "123456",
username: "Ju",
first_name: "Julia",
last_name:  "Frederico",
birth_date: Faker::Date.birthday(min_age: 12, max_age: 65),
about_me: "I´m a polyglot always looking for ways to improve my skills. Today i can speak 6 languages and i hope to learn a new one this year",
native_language: selected_languages.sample,
country: User::COUNTRIES.sample
)

user = User.create!(
email: "testeuser7@gmail.com",
password: "123456",
username: "Cyn",
first_name: "Cynthia",
last_name:  "Tsai",
birth_date: Faker::Date.birthday(min_age: 12, max_age: 65),
about_me: "A true rock lover, i´m a musician and a polyglot. I want to be able to compose and understand songs in other languages",
native_language: selected_languages.sample,
country: User::COUNTRIES.sample
)

user = User.create!(
email: "testeuser8@gmail.com",
password: "123456",
username: "Kenny",
first_name: "Ken",
last_name:  "Wall",
birth_date: Faker::Date.birthday(min_age: 12, max_age: 65),
about_me: "Although i already speak a few languages, i think that learning other languages are really important for me and my job. I´m very excited to try Hermes Land.",
native_language: selected_languages.sample,
country: User::COUNTRIES.sample
)

user = User.create!(
email: "testeuser9@gmail.com",
password: "123456",
username: "Rowazinho",
first_name: "Rowan",
last_name:  "Douglas",
birth_date: Faker::Date.birthday(min_age: 12, max_age: 65),
about_me: "I believe that it is never too late to learn something new. That´s why i am always trying yo learn new things. Hit me up if we have the same interests and lets talk.",
native_language: selected_languages.sample,
country: User::COUNTRIES.sample
)

user = User.create!(
email: "testeuser10@gmail.com",
password: "123456",
username: "Tomazinho",
first_name: "Tomas",
last_name:  "Gomes",
birth_date: Faker::Date.birthday(min_age: 12, max_age: 65),
about_me: "The more i learn, the more i want to learn. I´m an easy going guy with many friends around the world",
native_language: selected_languages.sample,
country: User::COUNTRIES.sample
)
