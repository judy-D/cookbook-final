import firebase from 'firebase';
import 'firebase/storage'

// Your web app's Firebase configuration
 var config = {
    apiKey: "AIzaSyD67YHSGubtmgb5_qaNkhw6239x5KoKEk0",
    authDomain: "cookbook-final.firebaseapp.com",
    databaseURL: "https://cookbook-final.firebaseio.com",
    projectId: "cookbook-final",
    storageBucket: "cookbook-final.appspot.com",
    messagingSenderId: "207262511354",
    appId: "1:207262511354:web:767e6f626291a15101d943"
  };
  // Initialize Firebase
  firebase.initializeApp(config);

  export default firebase;