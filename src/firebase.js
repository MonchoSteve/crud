import firebase from 'firebase'
import 'firebase/firestore'

const firebaseConfig = {
    apiKey: "AIzaSyCjuXgb27GI6ZUrK__JAYoDNPEJ6wNQu2k",
    authDomain: "crud-6f1e2.firebaseapp.com",
    projectId: "crud-6f1e2",
    storageBucket: "crud-6f1e2.appspot.com",
    messagingSenderId: "501626619397",
    appId: "1:501626619397:web:812baaec8825c66b137e6c",
    measurementId: "G-JB4V34K7X0"
  }

export const firebaseApp = firebase.initializeApp(firebaseConfig)