import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import { createPromise } from 'redux-promise-middleware';

import './App.css';
import { ToastContainer } from 'react-toastify';
import Routes from './routes/Routes';
import rootReducer from './rootReducer';


const store = createStore(
  rootReducer,
  compose(
    composeWithDevTools(applyMiddleware(
      thunk,
      createPromise({ promiseTypeSuffixes: ['LOADING', 'SUCCESS', 'ERROR'] }),
    )),
  ),
);

function App() {
  return (
    <Provider store={store}>
      <Router>
        <ToastContainer closeButton={false} />
        <Routes />
      </Router>
    </Provider>
  );
}

export default App;
