import {createStore, combineReducers, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import {composeWithDevTools} from 'redux-devtools-extension'
import {userLoginReducer} from './reducers/userReducers'
import { 
            userRegisterReducer,
            userDetailsReducer,
            userUpdateReducer,
            userListReducer,
            userDeleteReducer,
            userGetReducer,
            userModifyReducer,
            liveCampaignReducer,singleCampaignReducer,liveKickReducer
       }     from './reducers/userReducers'

const reducer= combineReducers({    
    userLogin:userLoginReducer,
    userRegister:userRegisterReducer,
    userDetails:userDetailsReducer,
    userUpdate:userUpdateReducer,
    userList:userListReducer,
    userDelete:userDeleteReducer,
    userGet:userGetReducer,
    userModify:userModifyReducer,
    liveCampaign:liveCampaignReducer,
    singleCampaign:singleCampaignReducer,   
    liveKick:liveKickReducer, 
})


const userInfoFromStorage= localStorage.getItem('userInfo') ? 
JSON.parse(localStorage.getItem('userInfo')) : null  

 

const initialState = {
    userLogin : { userInfo: userInfoFromStorage}
}

const middleware=[thunk]

const store=createStore(reducer,initialState,composeWithDevTools(applyMiddleware(...middleware)))

export default store