import { all, takeEvery, call, put } from 'redux-saga/effects';
import callApi from 'store/call-api';
import { fetchData, fetchDataPayloadType, fetchDataError, fetchDataSuccess } from './reducer';

function* watchFetchData({ payload }: { payload: fetchDataPayloadType }) {
  const res: ReturnType<typeof callApi> = yield call(callApi, payload.page, payload.tags);
  console.log(res)
  if (payload.callback) payload.callback();
  if (res.error) yield put(fetchDataError());
  else yield put(fetchDataSuccess(res.map((item: any) => ({
    image: item.media.m.replace('_m', '_c'),
    author: item.author,
    tags: item.tags.split(' ').join(', '),
    thumbnailImage: item.media.m
  }))))
}

export const rootSagas = function* rootSagas() {
  yield all([
    takeEvery(fetchData.type as any, watchFetchData)
  ]);
}
