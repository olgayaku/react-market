/** @type {import('next').NextConfig} */

module.exports = {
  reactStrictMode: true,
  env: {
    MYSQL_HOST: '127.0.0.1',
    MYSQL_PORT: '3306',
    MYSQL_DATABASE: 'react_market',
    MYSQL_USER: 'root',
    MYSQL_PASSWORD: 'root',
    FIREBASE_apiKey: 'AIzaSyCqHExRINMsVc3OXPn2QU1fY3v-aWBd7p8',
    FIREBASE_authDomain: 'react-market-4c447.firebaseapp.com',
    FIREBASE_projectId: 'react-market-4c447',
    FIREBASE_storageBucket: 'react-market-4c447.appspot.com',
    FIREBASE_messagingSenderId: '812923107512',
    FIREBASE_appId: '1:812923107512:web:9179652101ebe435135c4d',
  },
  serverRuntimeConfig: {
    secret:
      'THIS IS USED TO SIGN AND VERIFY JWT TOKENS, REPLACE IT WITH YOUR OWN SECRET, IT CAN BE ANY STRING',
  },
  publicRuntimeConfig: {
    apiUrl:
      process.env.NODE_ENV === 'development'
        ? 'http://localhost:3000/api' // development api
        : 'https://5lhh1.sse.codesandbox.io/api', // production api
  },
};
