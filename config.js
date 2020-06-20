import firebase from 'firebase';

var firebaseConfig = {
    apiKey: "AIzaSyD7lOKCeOh7mfTOulu57_v0ErCaHXL_XT0",
    authDomain: "db-stories.firebaseapp.com",
    databaseURL: "https://db-stories.firebaseio.com",
    projectId: "db-stories",
    storageBucket: "db-stories.appspot.com",
    messagingSenderId: "164266568039",
    appId: "1:164266568039:web:542ce2c7d13657d64627c2"
  };

  firebase.initializeApp(firebaseConfig);

  export default firebase.database();