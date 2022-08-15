import {initializeApp} from 'firebase/app';
import { getFirestore ,collection, addDoc,where,} from  'firebase/firestore';
import { getAuth } from "firebase/auth";
// { getFirestore ,collection, addDoc} from  
//import {seedDatabase} from "../seed"

const firebaseConfig = {
    apiKey: "AIzaSyCBAO30uLsGM19OhZgtO33OKJ5rhAwMzjk",
    authDomain: "instagram-az.firebaseapp.com",
    projectId: "instagram-az",
    storageBucket: "instagram-az.appspot.com",
    messagingSenderId: "826359149411",
    appId: "1:826359149411:web:3bb6b98c8375f7d2439956"
};

const FirebaseApp = initializeApp(firebaseConfig);


const FieldValue = getFirestore(FirebaseApp);
const auth =  getAuth(FirebaseApp);
// seedDatabase(Firebase); 


export { FirebaseApp , FieldValue ,auth };



/*
import { initializeApp } from 'firebase/app';
import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import { getFirestore } from 'firebase/firestore'

const docRef = firebase.firestore().doc();
getDoc(docRef);
const firebaseConfig = {
    apiKey: "AIzaSyCBAO30uLsGM19OhZgtO33OKJ5rhAwMzjk",
    authDomain: "instagram-az.firebaseapp.com",
    projectId: "instagram-az",
    storageBucket: "instagram-az.appspot.com",
    messagingSenderId: "826359149411",
    appId: "1:826359149411:web:3bb6b98c8375f7d2439956"
};
const firebaseApp = initializeApp( firebaseConfig);
const db = getFirestore(firebaseApp);
console.log(db)
export {firebaseApp,db, doc, getDoc,collection, addDoc ,query, where, getDocs}

 */