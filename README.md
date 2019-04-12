# PaymentSpring Gateway Portal

This site is the front end portion of a small project built to showcase some web development skills. It is an authenticated portal built on top of a Vuetify theme that allows users to make sample payments (through the "Make a Donation" page), using PaymentSpring as a payment processing system. The code for the API is found [here](https://github.com/kayleiburke/PaymentSpringGateway).

The live demo site can be accessed at: https://payment-spring-gateway-portal.herokuapp.com

- **Username:**  kaylei.burke@gmail.com
- **Password:** \*paymentspring*

## Credits
Built using the [Vuetify Material Dashboard](https://www.creative-tim.com/product/vuetify-material-dashboard) theme

## Getting Started
- Install Nodejs from [Nodejs Official Page](https://nodejs.org/en/)
- Open your terminal
- Navigate to the project
- Run `npm install` or `yarn install` if you use [Yarn](https://yarnpkg.com/en/)
- Run `npm run dev` or `yarn serve` to start a local development server
- A new tab will be opened in your browser

You can also run additional npm tasks such as
- `npm run build` to build your app for production
- `npm run lint` to run linting.

## Login
A default user has been created on the Heroku-based API called by this app (https://whispering-cove-68110.herokuapp.com).  The login information is below.

- **Username:**  kaylei.burke@gmail.com
- **Password:** \*paymentspring*

## Configuring the API
The path to the API is specified in `/src/backend/vue-axios/axios.js`.  This path can be changed for development purposes.
