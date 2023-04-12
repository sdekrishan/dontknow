import {legacy_createStore,combineReducers,applyMiddleware} from 'redux'
import thunk from 'redux-thunk';
import AuthReducer from './Auth/Auth.Reducer';
import PostReducer from './Posts/Post.Reducer';

const rootReducer = combineReducers({
    auth:AuthReducer,
    posts:PostReducer
})

const store= legacy_createStore(rootReducer,applyMiddleware(thunk));

export default store