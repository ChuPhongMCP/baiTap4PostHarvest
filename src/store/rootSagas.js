/* quy phạm khai báo Saga */
import { all, fork } from 'redux-saga/effects';
import ProfileSaga from 'store/profile/saga';

export default function* rootSaga() {
  yield all([
    fork(ProfileSaga), //khai báo thực hiện lệnh ProfileSaga
  ]);
}