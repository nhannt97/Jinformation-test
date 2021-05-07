/* eslint-disable no-undef */
import { combineReducers } from 'redux';
import { reducers } from './modules';

const rootReducer = combineReducers({
  ...reducers
});
export default rootReducer;
