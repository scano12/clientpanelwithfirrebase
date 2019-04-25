//Before implementing any of this we had to run the following commands in the terminal:
//npm i redux react-redux react-redux-firebase redux-firestore
//npm i firebase

import { createStore, combineReducers, compose } from "redux";
import firebase from "firebase";
import "firebase/firestore";
import { reactReduxFirebase, firebaseReducer } from "react-redux-firebase";
import { reduxFirestore, firestoreReducer } from "redux-firestore";

//Reducers
// @todo

const firebaseConfig = {
  apiKey: "AIzaSyDrcy8-hlCnCEtTsa1T0Wb8ZXlftP1Ns4k",
  authDomain: "reactclientpanel-5d232.firebaseapp.com",
  databaseURL: "https://reactclientpanel-5d232.firebaseio.com",
  projectId: "reactclientpanel-5d232",
  storageBucket: "reactclientpanel-5d232.appspot.com",
  messagingSenderId: "233969056479"
};

//react-redux-firebase config
const rrfConfig = {
  userProfile: "users",
  useFirestoreForProfile: true // Firestore for Profile instead of Realtime DB
};

//Initialize firebase instance
firebase.initializeApp(firebaseConfig);

//Initialize firestore
//const firestore = firebase.firestore();

// Add reactReduxFirebase enhancer when making store creator

const createStoreWithFirebase = compose(
  reactReduxFirebase(firebase, rrfConfig), // firebase instance as first argument
  reduxFirestore(firebase) // <- needed if using firestore
)(createStore);

// Add firebase to reducers
const rootReducer = combineReducers({
  firebase: firebaseReducer,
  firestore: firestoreReducer // <- needed if using firestore
});

// Create initial state
const initialState = {};

//Create Store
const store = createStoreWithFirebase(
  rootReducer,
  initialState,
  window._REDUX_DEVTOOLS_EXTENSION_ && window._REDUX_DEVTOOLS_EXTENSION_()
);

export default store;
