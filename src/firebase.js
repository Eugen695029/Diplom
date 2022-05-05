import firebase from 'firebase/compat/app';
import "firebase/compat/auth";
import "firebase/compat/firestore";


    const config={
        apiKey: "AIzaSyD3YloX-5EBUi2G6vqUZGTij-LrubV0QjA",
        authDomain: "stoked-producer-305411.firebaseapp.com",
        projectId: "stoked-producer-305411",
        storageBucket: "stoked-producer-305411.appspot.com",
        messagingSenderId: "756193831954",
        appId: "1:756193831954:web:5b272db58fc3a7ad4dbccb"
    };

    firebase.initializeApp(config);
    export default firebase 
    