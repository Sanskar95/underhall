
import firebase from 'firebase'
const firebaseConfig = {
    apiKey: "AIzaSyDDamNSA7Mm5vYzs6zGqSeo28xSmOEK2t4",
    authDomain: "underhall-5962b.firebaseapp.com",
    databaseURL: "https://underhall-5962b.firebaseio.com",
    projectId: "underhall-5962b",
    storageBucket: "underhall-5962b.appspot.com",
    messagingSenderId: "1012721071420",
    appId: "1:1012721071420:web:0a890a62240b6b492e1a39"
};
firebase.initializeApp(firebaseConfig);

const db  = firebase.firestore()
const auth= firebase.auth()
const storage =  firebase.storage()

export {db, auth, storage};
