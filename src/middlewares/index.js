import createSagaMiddleware from 'redux-saga';
import reducer from '../store/reducers/index';
import { applyMiddleware, createStore } from 'redux';
import {thunk} from 'redux-thunk';

export default function configureStore(initialState) {
  const sagaMiddleware = createSagaMiddleware();
  return {
    ...createStore(
      reducer,
      initialState,
      applyMiddleware(thunk, sagaMiddleware),
    ),
    runSaga: sagaMiddleware.run,
  };
}
