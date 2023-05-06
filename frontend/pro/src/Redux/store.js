import {legacy_createStore,combineReducers,applyMiddleware} from 'redux'
import thunk from 'redux-thunk';
import AuthReducer from './Auth/Auth.Reducer';
import PostReducer from './Posts/Post.Reducer';
import UserReducer from './User/User.Reducer';
import ChatReducer from './Chat/Chat.Reducer';

const rootReducer = combineReducers({
    auth:AuthReducer,
    posts:PostReducer,
    user:UserReducer,
    chat:ChatReducer
})

const store= legacy_createStore(rootReducer,applyMiddleware(thunk));

export default store