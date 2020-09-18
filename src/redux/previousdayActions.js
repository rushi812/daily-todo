import * as actionTypes from './actionTypes';
import api from '../utils/api';

export const openPendingTodo = () => ({
  type: actionTypes.OPEN_PENDING_TODO,
});

export const closePendingTodo = () => ({
  type: actionTypes.CLOSE_PENDING_TODO,
});

export const fetchPreviousDayTodos = (user, date) => ({
  type: actionTypes.FETCH_PREVIOUS_DAY_TODOS,
  payload: api.get(user.email, date),
});

export const addPreviousDayTodos = () => ({
  type: actionTypes.ADD_PREVIOUS_DAY_TODOS,
});

export const noAddPreviousDayTodos = () => ({
  type: actionTypes.NO_ADD_PREVIOUS_DAY_TODOS,
});
