import createSagaMiddleware from 'redux-saga';
import { createStore, applyMiddleware, compose } from 'redux';
import rootSaga from './sagas';
import rootReducer from './reducer';

const sagaMiddleware = createSagaMiddleware();
let combineMiddleWares = applyMiddleware(sagaMiddleware);

if (process.env.REACT_APP_ENV !== 'production') {
  const middlewares = [sagaMiddleware];
  const composeEnhancers = (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  combineMiddleWares = composeEnhancers(applyMiddleware(...middlewares));
}

const store = createStore(rootReducer, combineMiddleWares);
sagaMiddleware.run(rootSaga);
export default store;
