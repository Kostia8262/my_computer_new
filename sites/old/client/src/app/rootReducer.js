import { combineReducers } from 'redux';
import someReducer from './someReducer';
import anotherReducer from './anotherReducer';

const rootReducer = combineReducers({
    someState: someReducer,
    anotherState: anotherReducer,
});

export default rootReducer;