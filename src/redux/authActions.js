import * as actionTypes from './actionTypes';
import firebase from '../firebase/firebase';

export const signup = user => ({
  type: actionTypes.SIGN_UP,
  payload: firebase.auth().createUserWithEmailAndPassword(user.email, user.password),
});

export const signin = loginCred => ({
  type: actionTypes.SIGN_IN,
  payload: firebase.auth().signInWithEmailAndPassword(loginCred.email, loginCred.password),
});

export const logout = () => ({
  type: actionTypes.SIGN_OUT,
  payload: firebase.auth().signOut(),
});

export const fetchLoggedInUserData = user => ({
  type: actionTypes.FETCH_LOGGED_IN_USER,
  payload: user,
});
