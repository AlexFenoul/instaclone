import firebase from "firebase";

  // Your web app's Firebase configuration
  // For Firebase JS SDK v7.20.0 and later, measurementId is optional
  var firebaseConfig = {
    apiKey: "AIzaSyCRJGxkbq88pWPCPFSp8Cdvv5tfcwioW4s",
    authDomain: "web-fullstack.firebaseapp.com",
    projectId: "web-fullstack",
    storageBucket: "web-fullstack.appspot.com",
    messagingSenderId: "813468091744",
    appId: "1:813468091744:web:b0ac27790264c0c9838a05",
  };
 
  try {
    firebase.initializeApp(firebaseConfig);
  } catch (err) {
    if (!/already exists/.test(err.message)) {
      console.error('Firebase initialization error', err.stack);
    }
  }
  const fire = firebase;
  export default fire;