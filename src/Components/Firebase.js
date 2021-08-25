import firebase from 'firebase/app'
import 'firebase/database';    // for realtime database

const firebaseConfig = {
    apiKey: "AIzaSyACYjd-u9xRLpUOP0NijZo7J90tOIMTDxA",
    authDomain: "up-kixlab.firebaseapp.com",
    databaseURL: "https://up-kixlab-default-rtdb.firebaseio.com",
    projectId: "up-kixlab",
    storageBucket: "up-kixlab.appspot.com",
    messagingSenderId: "900710314472",
    appId: "1:900710314472:web:4529f214895ac47a90745d",
    measurementId: "G-Z7QJT4VQ9J"
  };
firebase.initializeApp(firebaseConfig);

export const db = firebase.database();
export default firebase;