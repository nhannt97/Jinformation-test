import { all, fork } from 'redux-saga/effects';
import { sagas } from './modules';

export default function* rootSaga() {
  console.log('Root saga runing...')
  yield all([
    ...sagas.map((saga) => fork(saga))
  ]);
}
