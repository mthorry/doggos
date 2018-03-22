DROP DATABASE IF EXISTS doggos;
CREATE DATABASE doggos;

\c doggos;

CREATE TABLE users (
  ID SERIAL PRIMARY KEY,
  username VARCHAR UNIQUE,
  email VARCHAR UNIQUE,
  password_digest VARCHAR,
  bio VARCHAR,
  profile_pic VARCHAR
);

CREATE TABLE photos (
  ID SERIAL PRIMARY KEY,
  caption VARCHAR,
  url VARCHAR,
  user_id INTEGER REFERENCES users(ID),
  username VARCHAR REFERENCES users(username),
  date_created TIMESTAMPTZ
);

CREATE TABLE likes (
  ID SERIAL PRIMARY KEY,
  username VARCHAR REFERENCES users(username),
  photo_id INTEGER REFERENCES photos(ID)
);

-- CREATE TABLE comments (
--   ID SERIAL PRIMARY KEY,
--   photo_id INTEGER REFERENCES photos(ID),
--   commenter_username VARCHAR REFERENCES users(username),
--   comment VARCHAR
-- );

CREATE TABLE follows (
  ID SERIAL PRIMARY KEY,
  followed_username VARCHAR REFERENCES users(username),
  follower_username VARCHAR REFERENCES users(username)
);

CREATE TABLE adoptables (
  ID SERIAL PRIMARY KEY,
  name VARCHAR,
  breed VARCHAR,
  age INTEGER,
  sex VARCHAR,
  url VARCHAR
);

INSERT INTO users (username, email, password_digest, bio, profile_pic)
  VALUES ('matt', 'matt@mail.com', '$2a$10$AfpU.q2VmSjewNfqHIimLODqFMPh4r/nOWcVauBNi10ByxQOprD7G', '3 wolf moon retro authentic banh mi blog. Pug 8-bit seitan, vinyl snackwave pork belly chicharrones +1 cornhole.', 'https://res.cloudinary.com/airwotever/image/upload/v1395969197/default-profile-pic_hkmqpe.png'),
  ('ozzy', 'ozzy@mail.com', '$2a$10$AfpU.q2VmSjewNfqHIimLODqFMPh4r/nOWcVauBNi10ByxQOprD7G', 'Keffiyeh everyday carry four dollar toast DIY, wolf knausgaard banjo pour-over actually lyft bespoke pok pok readymade sustainable.', 'https://res.cloudinary.com/airwotever/image/upload/v1395969197/default-profile-pic_hkmqpe.png'),
  ('hannah', 'hannah@mail.com', '$2a$10$AfpU.q2VmSjewNfqHIimLODqFMPh4r/nOWcVauBNi10ByxQOprD7G', 'Salvia health goth before they sold out kale chips, taxidermy deep v vape selvage occupy glossier offal air plant.', 'https://res.cloudinary.com/airwotever/image/upload/v1395969197/default-profile-pic_hkmqpe.png'),
  ('luke', 'luke@mail.com', '$2a$10$AfpU.q2VmSjewNfqHIimLODqFMPh4r/nOWcVauBNi10ByxQOprD7G', 'Vice etsy hell of, meggings hammock williamsburg VHS artisan meditation tofu blue bottle readymade listicle bushwick.', 'https://res.cloudinary.com/airwotever/image/upload/v1395969197/default-profile-pic_hkmqpe.png'),
  ('sam', 'sam@mail.com', '$2a$10$AfpU.q2VmSjewNfqHIimLODqFMPh4r/nOWcVauBNi10ByxQOprD7G', 'Cornhole vape edison bulb cold-pressed messenger bag, cray lomo kickstarter YOLO schlitz.', 'https://res.cloudinary.com/airwotever/image/upload/v1395969197/default-profile-pic_hkmqpe.png');

INSERT INTO adoptables (name, breed, age, sex, url)
  VALUES ('Max', 'Golden Retriever', 4, 'M', 'www.thorry.io'),
  ('Mojo', 'Brittany Spaniel', 11, 'M', 'www.thorry.io');

INSERT INTO photos (caption, url, user_id, username, date_created)
  VALUES ('lovin life!', 'https://c1.staticflickr.com/8/7339/12413787454_89113147e6_b.jpg', 1, 'matt', NOW());
INSERT INTO photos (caption, url, user_id, username, date_created)
  VALUES ('yay!', 'https://i.amz.mshcdn.com/zA7eX2PjjIb_K9ZoUpMuolBd2B4=/950x534/filters:quality(90)/https%3A%2F%2Fblueprint-api-production.s3.amazonaws.com%2Fuploads%2Fcard%2Fimage%2F683814%2Fc9aebd63-fc52-48a4-9ddf-1bca18375608.jpg', 1, 'matt', NOW());
INSERT INTO photos (caption, url, user_id, username, date_created)
  VALUES ('fun', 'https://pics.me.me/doggos-what-did-we-ever-do-to-deserve-you-%F0%9F%98%A2-4590689.png', 1, 'matt', NOW());
INSERT INTO photos (caption, url, user_id, username, date_created)
  VALUES ('lovin life more!', 'https://az616578.vo.msecnd.net/files/2016/08/22/6360750671681651291985063401_2f48cf84fdd0ef751a79d8e22e8b4db229878f8bfd5fb415421e5d2ba7b093f5_1.jpg', 1, 'matt', NOW());
INSERT INTO photos (caption, url, user_id, username, date_created)
  VALUES ('lovin life!', 'https://c1.staticflickr.com/8/7339/12413787454_89113147e6_b.jpg', 2, 'ozzy', NOW());
INSERT INTO photos (caption, url, user_id, username, date_created)
  VALUES ('yay!', 'https://i.pinimg.com/736x/cc/d5/92/ccd592406f11ad57efbe871c5e71b19e--kawaii-fashion-taco-tuesday.jpg', 2, 'ozzy', NOW());
INSERT INTO photos (caption, url, user_id, username, date_created)
  VALUES ('fun', 'https://c1.staticflickr.com/8/7339/12413787454_89113147e6_b.jpg', 2, 'ozzy', NOW());
INSERT INTO photos (caption, url, user_id, username, date_created)
  VALUES ('lovin life more!', 'https://media.tenor.com/images/2e134ea071498a68c777d5540b65fecd/tenor.gif', 2, 'ozzy', NOW());

INSERT INTO likes (username, photo_id)
  VALUES ('matt', 5), ('matt', 6), ('matt', 7), ('matt', 8), ('ozzy', 1), ('hannah', 8), ('sam', 8), ('sam', 1), ('luke', 8), ('luke', 1);

INSERT INTO follows (followed_username, follower_username)
  VALUES ('matt', 'ozzy'), ('ozzy', 'matt'), ('matt', 'hannah'), ('matt', 'luke'), ('matt', 'sam'), ('ozzy', 'hannah')