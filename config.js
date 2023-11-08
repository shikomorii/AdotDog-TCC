import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyAuTUtfJBnp-ZuB-0zRaeHzMXXO6p8P-os",
  authDomain: "adotdog-auth.firebaseapp.com",
  projectId: "adotdog-auth",
  storageBucket: "adotdog-auth.appspot.com",
  messagingSenderId: "753620639874",
  appId: "1:753620639874:web:d2af37673aa39c6928549b",
  measurementId: "G-SE3H2ZK778"
}

if (!firebase.apps.length){
    firebase.initializeApp(firebaseConfig);
}

export { firebase};