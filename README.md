# Hostel Meals Management System

Welcome to the Hostel Meals Management System, a comprehensive platform designed to streamline meal management and enhance the dining experience for university hostel residents.

## Admin Credentials
- **Username:** ah antar
- **email:** ahantar588@gmail.com
- **Password:** 123456

## Live Site URL
[Visit the live site here](https://hostelmealsmanagement.web.app/)
## Server side code
[Visit  here](https://github.com/AmirHossain58/hostel-meal-management-system-server/tree/main)

## Features of the Website

- **Student Login**: Secure login for students using email and password, with options for social logins via Google and Facebook.
- **Meal Management**: Admins can add, update, or delete meals with detailed information, including images, descriptions, ingredients, and nutritional facts.
- **Review System**: Students can review meals, providing ratings and comments to help others make informed choices.
- **Search Functionality**: Advanced search based on all meal data, allowing users to find specific meals quickly.
- **Upcoming Meals**: Display of upcoming meals with a like feature for premium users, encouraging engagement and feedback.
- **User Dashboard**: Personalized dashboard for users to view their profile, requested meals, reviews, and payment history.
- **Admin Dashboard**: Comprehensive admin panel for managing users, meals, reviews, and meal requests.
- **Responsive Design**: Fully responsive design ensuring a seamless experience across mobile, tablet, and desktop devices.
- **Persistent Login**: Users remain logged in even after page reloads, providing a smoother user experience.
- **Notifications**: Custom notifications for all CRUD operations, successful authentication, and other key actions.
- **Secure Payments**: Integration with Stripe for secure payment processing for meal plans and premium subscriptions.

## Packages Used
- **@headlessui/react**: "^2.0.3"
- **@smastrom/react-rating**: "^1.5.0"
- **@stripe/react-stripe-js**: "^2.7.1"
- **@stripe/stripe-js**: "^3.4.0"
- **@tanstack/react-query**: "^5.36.0"
- **axios**: "^1.7.2"
- **firebase**: "^10.11.1"
- **react**: "^18.2.0"
- **react-date-range**: "^2.0.1"
- **react-dom**: "^18.2.0"
- **react-helmet-async**: "^2.0.5"
- **react-hook-form**: "^7.51.5"
- **react-hot-toast**: "^2.4.1"
- **react-icons**: "^5.2.1"
- **react-infinite-scroller**: "^1.2.6"
- **react-rating**: "^2.0.5"
- **react-router-dom**: "^6.23.1"
- **react-spinners**: "^0.13.8"
- **sweetalert2**: "^11.11.0"
- **swiper**: "^11.1.4"
- **tailwindcss**: "^3.4.3"
- **daisyui**: "^4.11.1"


Installation and Setup
Follow these steps to clone and run the Hostel Meals Management System locally:

Clone the clint and server Repository

```
git clone //<repository-url>
cd //<repository-folder>
```
Install Server Dependencies
```
cd //server
npm install
```
Install Client Dependencies
```
cd //client
npm install
```
Set Up Environment Variables

## Create a .env file in the client directory with:

//firebase env
- VITE_apiKey=//api key
- VITE_authDomain=// auth dommain
- VITE_appId=// api id
- VITE_projectId=//projectId
- VITE_storageBucket=//storageBucket
- VITE_messagingSenderId=//messagingSenderId

- VITE_API_URL=http://localhost:8000
- VITE_IMAGE_HOSTING_KEY=//IMAGE_HOSTING_KEY

- VITE_Payment_Gateway_PK= //pk_test_Payment_Gateway

## Create a .env file in the server directory with:

- DB_USER= //database user name
- DB_PASS=//password
- ACCESS_TOKEN_SECRET= //token secret jwt
- STRIPE_SECRET_KEY=//sk_test_key
Run the Server

```
cd //server
npm start
```
Run the Client
```
cd //client
npm start
```
