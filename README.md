# doggos
A social photo app just for dog photos (because that’s why you’re really on Instagram).

## Installation
1. Clone or Fork repo.
2. `cd` to backend folder and run `npm install`
3. `cd` to db folder and run `psql -f database.sql` to seed database (make sure you have Postgres installed and running)
4. run `npm start` to start backend server which runs on `localhost://3001`
5. `cd` to frontend folder and run `npm install`
6. run `npm start` to start frontend server which runs on `localhost://3000`

## Frontend
Built with JavaScript, React and custom responsive CSS. Comprised of 11 components with full CRUD functionality for users.

## Backend
Built RESTful API with JavaScript, Express, Node.js, raw SQL queries and Passport for authentication. Over 20 routes allowing full CRUD functionality including followers/following and likes.

## Feature Demos
### Login/User authentication
![login.gif](https://i.gyazo.com/b0982066ec78af49c6246c59f6a1c112.gif)

### Photo Feed
![feed.gif](https://i.gyazo.com/3341d8f7307fea27fb878f48ca29850f.gif)

### User Profiles
![profile.gif](https://i.gyazo.com/edf0347589301ae9551e4dda819fb1bc.gif)

### Upload Photo
![photo.gif](https://i.gyazo.com/9689a34ba1e5b648bf250c2c20274a25.gif)

### Responsive
![responsive.gif](https://i.gyazo.com/9d59fdcbedcffb94fab5e5c809e43aa7.gif)
