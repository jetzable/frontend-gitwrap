import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { configureStore } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';

import reposReducer from './features/repos';
import usernameReducer from './features/username';
import currentRepoReducer from './features/currentRepo';
import selectedRepoReducer from './features/selectedRepo';
import branchesReducer from './features/branches';
import branchReducer from './features/branch';
import commitReducer from './features/commit';


// Global state
const store = configureStore({
  reducer: {
    repos: reposReducer,
    username: usernameReducer,
    currentRepo: currentRepoReducer,
    selectedRepo: selectedRepoReducer,
    branches: branchesReducer,
    branch: branchReducer,
    commit: commitReducer,
  }
})

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Provider store={store}>
        <App />
      </Provider>
    </BrowserRouter>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();