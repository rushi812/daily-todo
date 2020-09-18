import moment from 'moment';
import * as actionTypes from './actionTypes';
import { defaultTime } from '../utils/index';

const initialValues = {
  updateNotificationTimeLoading: false,
  fetchNotificationTimeLoading: false,
  setNotificationTimeLoading: false,
  changedMorningTime: defaultTime('11:00:00'),
  changedEveningTime: defaultTime('19:00:00'),
};

const notificationReducer = (state = initialValues, action) => {
  const { type, payload } = action;

  switch (type) {
    case actionTypes.SET_NOTIFICATION_TIME_LOADING:
      return {
        ...state,
        setNotificationTimeLoading: true,
      };
    case actionTypes.SET_NOTIFICATION_TIME_SUCCESS:
      return {
        ...state,
        setNotificationTimeLoading: false,
      };
    case actionTypes.SET_NOTIFICATION_TIME_ERROR:
      return {
        ...state,
        setNotificationTimeLoading: false,
      };
    case actionTypes.UPDATE_NOTIFICATION_TIME_LOADING:
      return {
        ...state,
        updateNotificationTimeLoading: true,
      };
    case actionTypes.UPDATE_NOTIFICATION_TIME_SUCCESS:
      return {
        ...state,
        updateNotificationTimeLoading: false,
      };
    case actionTypes.UPDATE_NOTIFICATION_TIME_ERROR:
      return {
        ...state,
        updateNotificationTimeLoading: false,
      };
    case actionTypes.FETCH_NOTIFICATION_TIME_LOADING:
      return {
        ...state,
        fetchNotificationTimeLoading: true,
      };
    case actionTypes.FETCH_NOTIFICATION_TIME_SUCCESS:
      return {
        ...state,
        fetchNotificationTimeLoading: false,
        changedMorningTime: (payload.data ? payload.data.mTime : state.changedMorningTime),
        changedEveningTime: (payload.data ? payload.data.eTime : state.changedEveningTime),
      };
    case actionTypes.FETCH_NOTIFICATION_TIME_ERROR:
      return {
        ...state,
        fetchNotificationTimeLoading: false,
      };
    case actionTypes.MORNING_TIME_CHANGE:
      return {
        ...state,
        changedMorningTime: moment(payload.data).format(),
      };
    case actionTypes.EVENING_TIME_CHANGE:
      return {
        ...state,
        changedEveningTime: moment(payload.data).format(),
      };
    case actionTypes.SIGN_OUT_LOADING:
      return {
        ...state,
      };
    case actionTypes.SIGN_OUT_SUCCESS:
      return {
        ...state,
        changedMorningTime: defaultTime('11:00:00'),
        changedEveningTime: defaultTime('19:00:00'),
      };
    case actionTypes.SIGN_OUT_ERROR:
      return {
        ...state,
      };
    default:
      return {
        ...state,
      };
  }
};

export default notificationReducer;
