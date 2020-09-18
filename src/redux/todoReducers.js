import * as actionTypes from './actionTypes';
import { formatedDate } from '../utils/index';

const initialValues = {
  fetchTodoLoading: false,
  addTodoLoading: false,
  deleteTodoLoading: false,
  markTodoDoneLoading: false,
  updateTodoLoading: false,
  fetchPreviouDayTodoLoading: false,
  openPendingTodoDialog: false,
  addPendingPreviousDayTodos: false,
  showTodoNotification: false,
  todos: [],
  previousDayTodos: [],
  isEdit: false,
  selectedTodo: {},
  date: formatedDate(new Date()),
  copyBtnText: 'Copy to Clipboard',
  toastClose: false,
};

const todoReducer = (state = initialValues, action) => {
  const { type, payload } = action;

  switch (type) {
    case actionTypes.ADD_TODO_LOADING:
      return {
        ...state,
        addTodoLoading: true,
      };
    case actionTypes.ADD_TODO_SUCCESS:
      return {
        ...state,
        addTodoLoading: false,
        showTodoNotification: true,
        todos: [
          ...state.todos,
          {
            ...payload,
          },
        ],
      };
    case actionTypes.ADD_TODO_ERROR:
      return {
        ...state,
        addTodoLoading: false,
      };
    case actionTypes.COPY_TO_CLIPBOARD:
      return {
        ...state,
        copyBtnText: 'Copied!',
      };
    case actionTypes.TOAST_CLOSE:
      return {
        ...state,
        copyBtnText: 'Copy to Clipboard',
      };
    case actionTypes.FETCH_TODOS_LOADING:
      return {
        ...state,
        fetchTodoLoading: true,
      };
    case actionTypes.FETCH_TODOS_SUCCESS: {
      return {
        ...state,
        fetchTodoLoading: false,
        todos: payload
          .slice()
          .sort((a, b) => a.createdAt - b.createdAt),
      };
    }
    case actionTypes.FETCH_TODOS_ERROR:
      return {
        ...state,
        fetchTodoLoading: false,
      };
    case actionTypes.FETCH_PREVIOUS_DAY_TODOS_LOADING:
      return {
        ...state,
        fetchPreviouDayTodoLoading: true,
      };
    case actionTypes.FETCH_PREVIOUS_DAY_TODOS_SUCCESS:
      return {
        ...state,
        fetchPreviouDayTodoLoading: false,
        previousDayTodos: payload.filter(todo => todo.isDone === false),
      };
    case actionTypes.FETCH_PREVIOUS_DAY_TODOS_ERROR:
      return {
        ...state,
        fetchPreviouDayTodoLoading: false,
      };
    case actionTypes.ADD_PREVIOUS_DAY_TODOS:
      return {
        ...state,
        addPendingPreviousDayTodos: true,
        todos: [
          ...state.todos,
          ...state.previousDayTodos,
        ],
      };
    case actionTypes.NO_ADD_PREVIOUS_DAY_TODOS:
      return {
        ...state,
        addPendingPreviousDayTodos: false,
      };
    case actionTypes.DELETE_TODO_LOADING:
      return {
        ...state,
        deleteTodoLoading: true,
      };
    case actionTypes.DELETE_TODO_SUCCESS:
      return {
        ...state,
        deleteTodoLoading: false,
        showTodoNotification: false,
        todos: state.todos.filter(todo => todo.id !== payload.id),
      };
    case actionTypes.DELETE_TODO_ERROR:
      return {
        ...state,
        deleteTodoLoading: false,
      };
    case actionTypes.MARK_TODO_DONE_LOADING:
      return {
        ...state,
        markTodoDoneLoading: true,
      };
    case actionTypes.MARK_TODO_DONE_SUCCESS:
      return {
        ...state,
        markTodoDoneLoading: false,
        showTodoNotification: false,
        todos: state.todos.map(todo => (
          (todo.createdAt === payload.createdAt)
            ? {
              ...todo,
              isDone: !todo.isDone,
            }
            : todo)),
        previousDayTodos: state.previousDayTodos.map(todo => (
          (todo.createdAt === payload.createdAt)
            ? {
              ...todo,
              isDone: !todo.isDone,
            }
            : todo)),
      };
    case actionTypes.MARK_TODO_DONE_ERROR:
      return {
        ...state,
        markTodoDoneLoading: false,
      };
    case actionTypes.EDIT_TODO:
      return {
        ...state,
        isEdit: true,
        selectedTodo: state.todos.filter(todo => todo.id === payload.id)[0],
      };
    case actionTypes.CANCEL_EDIT:
      return {
        ...state,
        isEdit: false,
        selectedTodo: {},
      };
    case actionTypes.UPDATE_TODO_LOADING:
      return {
        ...state,
        updateTodoLoading: true,
      };
    case actionTypes.UPDATE_TODO_SUCCESS:
      return {
        ...state,
        updateTodoLoading: false,
        isEdit: false,
        todos: state.todos.map(todo => (
          (todo.id === payload.id)
            ? {
              ...todo,
              todo: payload.data.todo,
            }
            : todo
        )),
        selectedTodo: {},
      };
    case actionTypes.UPDATE_TODO_ERROR:
      return {
        ...state,
        updateTodoLoading: false,
      };
    case actionTypes.DATE_CHANGE:
      return {
        ...state,
        date: formatedDate(payload.data),
        copyBtnText: 'Copy to Clipboard',
      };
    case actionTypes.OPEN_PENDING_TODO:
      return {
        ...state,
        openPendingTodoDialog: true,
      };
    case actionTypes.CLOSE_PENDING_TODO:
      return {
        ...state,
        openPendingTodoDialog: false,
      };
    case actionTypes.SIGN_OUT_LOADING:
      return {
        ...state,
      };
    case actionTypes.SIGN_OUT_SUCCESS:
      return {
        ...state,
        todos: [],
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

export default todoReducer;
