import * as actionTypes from './actionTypes';

const initialValues = {
  user: {},
  signUpLoading: false,
  signInLoading: false,
  signOutLoading: false,
  signUpError: null,
  signInError: null,
  signOutError: null,
};

const authReducer = (state = initialValues, action) => {
  const { type, payload } = action;

  switch (type) {
    case actionTypes.SIGN_UP_LOADING:
      return {
        ...state,
        signUpLoading: true,
        signUpError: null,
      };
    case actionTypes.SIGN_UP_SUCCESS:
      localStorage.setItem('uid', payload.user.uid);
      return {
        ...state,
        signUpLoading: false,
        signUpError: null,
        userId: payload.user.uid,
      };
    case actionTypes.SIGN_UP_ERROR:
      return {
        ...state,
        signUpLoading: false,
        signUpError: payload.error,
      };
    case actionTypes.SIGN_IN_LOADING:
      return {
        ...state,
        signInLoading: true,
        signInError: null,
      };
    case actionTypes.SIGN_IN_SUCCESS:
      localStorage.setItem('uid', payload.user.uid);
      return {
        ...state,
        signInLoading: false,
        signInError: null,
        user: {
          userId: payload.user.uid,
          email: payload.user.email,
        },
      };
    case actionTypes.SIGN_IN_ERROR:
      return {
        ...state,
        signInLoading: false,
        signInError: payload.error,
      };
    case actionTypes.SIGN_OUT_LOADING:
      return {
        ...state,
        signOutLoading: true,
        signOutError: null,
      };
    case actionTypes.SIGN_OUT_SUCCESS:
      localStorage.clear();
      return {
        ...state,
        signOutLoading: false,
        signOutError: null,
        user: {},
      };
    case actionTypes.SIGN_OUT_ERROR:
      return {
        ...state,
        signOutLoading: false,
        signOutError: payload.error,
      };
    case actionTypes.FETCH_LOGGED_IN_USER:
      return {
        ...state,
        user: {
          userId: payload.uid,
          email: payload.email,
        },
      };
    default:
      return {
        ...state,
      };
  }
};

export default authReducer;
