import moment from 'moment';

import * as actionTypes from './actionTypes';
import api from '../utils/api';

export const fetchTodos = (user, date) => {
  const currentDate = moment(date).format('DDMMYYYY');
  return ({
    type: actionTypes.FETCH_TODOS,
    payload: api.get(user.email, currentDate),
  });
};

export const addTodo = (data, date, user) => ({
  type: actionTypes.ADD_TODO,
  payload: api.add(user.email, date, data),
});

export const deleteTodo = (user, id, date) => {
  const currentDate = moment(date).format('DDMMYYYY');
  return ({
    type: actionTypes.DELETE_TODO,
    payload: api.del(user.email, id, currentDate),
  });
};

export const markDone = (todo, user, date) => {
  const currentDate = moment(date).format('DDMMYYYY');
  return ({
    type: actionTypes.MARK_TODO_DONE,
    payload: api.done(todo, user.email, currentDate),
  });
};

export const editTodo = id => ({
  type: actionTypes.EDIT_TODO,
  payload: {
    id,
  },
});

export const cancelEdit = () => ({
  type: actionTypes.CANCEL_EDIT,
});

export const updateTodo = (id, data, user, date) => {
  const currentDate = moment(date).format('DDMMYYYY');
  return ({
    type: actionTypes.UPDATE_TODO,
    payload: api.update(id, data, user.email, currentDate),
  });
};

export const dateChange = date => ({
  type: actionTypes.DATE_CHANGE,
  payload: {
    data: date,
  },
});

export const copyToClipboard = () => ({
  type: actionTypes.COPY_TO_CLIPBOARD,
});

export const toastClose = () => ({
  type: actionTypes.TOAST_CLOSE,
});
