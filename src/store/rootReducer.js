/* quy phạm khai báo rootReducer */
import { combineReducers } from 'redux';

import profileReducer from './profile/reducer';

const rootReducer = combineReducers({
  profileReducer //khai báo reducer profileReducer vào store
});

export default rootReducer;
