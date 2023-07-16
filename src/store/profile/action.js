import * as ActionTypes from './actionTypes';

export const actionGetMyProfile = () => ({ //lấy data profile từ api
  type: ActionTypes.GET_MY_PROFILE,
});

export const actionGetMyProfileSuccess = (payload) => ({ //lấy data từ api thành công
  type: ActionTypes.GET_MY_PROFILE_SUCCESS,
  payload, //data
});

export const actionGetMyProfileFailed = (payload) => ({ //lấy data từ api thất bại
  type: ActionTypes.GET_MY_PROFILE_FAILED,
  payload, //data
});
