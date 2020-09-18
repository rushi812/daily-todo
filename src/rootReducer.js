import { combineReducers } from 'redux';

import authReducer from './redux/authReducer';
import todoReducer from './redux/todoReducers';
import notificationReducer from './redux/notificationReducer';

const rootReducer = combineReducers({
  auth: authReducer,
  todo: todoReducer,
  notification: notificationReducer,
});

export default rootReducer;
