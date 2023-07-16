import profile from 'api/profileApi';
import { put, takeLeading } from 'redux-saga/effects';

import * as ActionTypes from './actionTypes';
import { actionGetMyProfileFailed, actionGetMyProfileSuccess } from './action';

function* getMyProfile() {
    try {
      const response = yield profile.getMyProfile(); //gọi hàm lấy data profile trong api/profileApi
  
      yield put(actionGetMyProfileSuccess(response)); //nếu call api lấy thành công, gọi action actionGetMyProfileSuccess và truyền vào response(data) đã get để lưu vào store
    } catch (error) {
      yield put(actionGetMyProfileFailed()); //nếu call api thất bại gọi action actionGetMyProfileFailed để dừng trạng thái loading và ném lỗi
    }
  }

  export default function* profileSaga() {
    yield takeLeading(ActionTypes.GET_MY_PROFILE, getMyProfile); //gọi hàm getMyProfile() ở trên nếu nghe thấy lệnh ActionTypes.GET_MY_PROFILE từ 1 component nào đó
  };
