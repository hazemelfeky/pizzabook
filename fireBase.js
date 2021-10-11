// import { initializeApp } from "https://www.gstatic.com/firebasejs/9.0.2/firebase-app.js";
// var app_firebase = {}
// // var firebase = fireBase || firebase;

// (function(){

//   // TODO: Add SDKs for Firebase products that you want to use
//   // https://firebase.google.com/docs/web/setup#available-libraries

//   // Your web app's Firebase configuration
//   const firebaseConfig = {
//     apiKey: "AIzaSyDO17pmEZNMUrIi7FDwatb3S1DqihNFcck",
//     authDomain: "pizzabook-64b58.firebaseapp.com",
//     projectId: "pizzabook-64b58",
//     storageBucket: "pizzabook-64b58.appspot.com",
//     messagingSenderId: "374769713966",
//     appId: "1:374769713966:web:7a104d7df2f70fa0aab0bf"
//   };

//   // Initialize Firebase
//   initializeApp(firebaseConfig);

//   app_fireBase = firebase;
// })()

var fireBase = fireBase || firebase;
var hasInit = false;
var config = {
  apiKey: "AIzaSyDO17pmEZNMUrIi7FDwatb3S1DqihNFcck",
  authDomain: "pizzabook-64b58.firebaseapp.com",
  projectId: "pizzabook-64b58",
  storageBucket: "pizzabook-64b58.appspot.com",
  messagingSenderId: "374769713966",
  appId: "1:374769713966:web:7a104d7df2f70fa0aab0bf"
  };
if(!hasInit){
  firebase.initializeApp(config);
  hasInit = true;
}
