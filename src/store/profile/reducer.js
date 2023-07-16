import * as ActionTypes from './actionTypes';

// DEFAULT STATE
const defaultState = {
    isLoading: false,
    profile: {},
};

const profileReducer = (state = defaultState, action) => {
    switch (action.type) {
        case ActionTypes.GET_MY_PROFILE: //action actionGetMyProfile
            return { ...state, isLoading: true }; //set isLoading = true để gọi màn hình loading

        case ActionTypes.GET_MY_PROFILE_SUCCESS: //actionGetMyProfileSuccess
            return { ...state, profile: action.payload, isLoading: false }; //gán data profile trả về từ api vào profile trong store, set isLoading = false để tắt màn hình loading

        case ActionTypes.GET_MY_PROFILE_FAILED: //actionGetMyProfileFailed
            return { ...state, isLoading: false }; //set isLoading = false để tắt màn hình loading

        default:
            return state;
    }
};

export default profileReducer;
