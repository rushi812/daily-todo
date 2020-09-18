import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const firebaseConfig = {
  apiKey: 'AIzaSyA8skqJ16VwMjLCoCC2WEj3AqRNGswiWqw',
  authDomain: 'daily-todo-app-75539.firebaseapp.com',
  databaseURL: 'https://daily-todo-app-75539.firebaseio.com',
  projectId: 'daily-todo-app-75539',
  storageBucket: 'daily-todo-app-75539.appspot.com',
  messagingSenderId: '711116382020',
  appId: '1:711116382020:web:81d0182e39dda4c9e24111',
};

firebase.initializeApp(firebaseConfig);
firebase.firestore();

export default firebase;
