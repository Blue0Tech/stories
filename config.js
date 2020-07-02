import firebase from 'firebase';

var firebaseConfig = {
    apiKey: "AIzaSyDJ9jyySMCQdAPxebwFZeE2_79j21QADcU",
    authDomain: "db-story.firebaseapp.com",
    databaseURL: "https://db-story.firebaseio.com",
    projectId: "db-story",
    storageBucket: "db-story.appspot.com",
    messagingSenderId: "118365037170",
    appId: "1:118365037170:web:96ef522839cdb5cef058eb"
  };

  firebase.initializeApp(firebaseConfig);

  export default firebase.database();