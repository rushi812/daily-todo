import * as actionTypes from './actionTypes';
import api from '../utils/api';

export const morningTimeChange = date => ({
  type: actionTypes.MORNING_TIME_CHANGE,
  payload: {
    data: date,
  },
});

export const eveningTimeChange = date => ({
  type: actionTypes.EVENING_TIME_CHANGE,
  payload: {
    data: date,
  },
});

export const updateNotificationTime = (user, mTime, eTime) => ({
  type: actionTypes.UPDATE_NOTIFICATION_TIME,
  payload: api.updateTime(user.email, mTime, eTime),
});

export const fetchNotificationTime = user => ({
  type: actionTypes.FETCH_NOTIFICATION_TIME,
  payload: api.fetchTime(user.email),
});

export const setNotificationTime = (user, mTime, eTime) => ({
  type: actionTypes.SET_NOTIFICATION_TIME,
  payload: api.setTime(user.email, mTime, eTime),
});
