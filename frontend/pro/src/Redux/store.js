import {legacy_createStore,combineReducers,applyMiddleware} from 'redux'
import thunk from 'redux-thunk';
import AuthReducer from './Auth/Auth.Reducer';
import PostReducer from './Posts/Post.Reducer';
import UserReducer from './User/User.Reducer';

const rootReducer = combineReducers({
    auth:AuthReducer,
    posts:PostReducer,
    user:UserReducer
})

const store= legacy_createStore(rootReducer,applyMiddleware(thunk));

export default store