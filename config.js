import firebase from 'firebase';
// import 'firebase/analytics'; apparently firebase analytics doesn't work in react-native
import 'firebase/auth';

var firebaseConfig = {
  apiKey: "AIzaSyD7lOKCeOh7mfTOulu57_v0ErCaHXL_XT0",
  authDomain: "db-stories.firebaseapp.com",
  databaseURL: "https://db-stories.firebaseio.com",
  projectId: "db-stories",
  storageBucket: "db-stories.appspot.com",
  messagingSenderId: "164266568039",
  appId: "1:164266568039:web:542ce2c7d13657d64627c2",
  measurementId: "G-S8HD20VWFR"
};

firebase.initializeApp(firebaseConfig);
// firebase.analytics(); apparently firebase analytics doesn't work in react-native

export default firebase.database();