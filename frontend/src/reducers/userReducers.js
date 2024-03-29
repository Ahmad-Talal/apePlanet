import {
    USER_LOGIN_REQUEST,
    USER_LOGIN_SUCCESS,
    USER_LOGIN_FAIL,

    USER_LOGOUT,

    USER_REGISTER_REQUEST,
    USER_REGISTER_SUCCESS,
    USER_REGISTER_FAIL,

    USER_DETAILS_REQUEST,
    USER_DETAILS_SUCCESS,
    USER_DETAILS_FAIL,
    USER_DETAILS_RESET,

    USER_UPDATE_REQUEST,
    USER_UPDATE_SUCCESS,
    USER_UPDATE_FAIL,
    USER_UPDATE_RESET,

    USER_LIST_REQUEST,
    USER_LIST_SUCCESS,
    USER_LIST_FAIL,
    USER_LIST_RESET,

    USER_DELETE_REQUEST,
    USER_DELETE_SUCCESS,
    USER_DELETE_FAIL,

    USER_GET_REQUEST,
    USER_GET_SUCCESS,
    USER_GET_FAIL,

    USER_MODIFY_REQUEST,
    USER_MODIFY_SUCCESS,
    USER_MODIFY_FAIL,
    USER_MODIFY_RESET,

    LIVE_GET_REQUEST,
    LIVE_GET_SUCCESS,
    LIVE_GET_FAIL,
    LIVE_GET_RESET,

    CAMPAIGN_GET_REQUEST,
    CAMPAIGN_GET_SUCCESS,
    CAMPAIGN_GET_FAIL,

    KICK_GET_REQUEST,
    KICK_GET_SUCCESS,
    KICK_GET_FAIL,

} from '../constants/userConstants'

export const userLoginReducer= (state={},action)=>{
    switch(action.type){
    case USER_LOGIN_REQUEST:
    
    return {loading:true}
    
    case USER_LOGIN_SUCCESS:
        return{loading:false, userInfo:action.payload}
    
    case USER_LOGIN_FAIL:
        return{loading:false, error:action.payload} 
    case USER_LOGOUT:
            return{} 

    default:
        return state

}
}


export const userRegisterReducer= (state={},action)=>{
    switch(action.type){
    case USER_REGISTER_REQUEST:
    
    return {loading:true}
    
    case USER_REGISTER_SUCCESS:
        return{loading:false, userInfo:action.payload}   
    
    case USER_REGISTER_FAIL:
        return{loading:false, error:action.payload} 
    
        case USER_LOGOUT:
            return{} 

    default:
        return state

}
}


export const userDetailsReducer= (state={user:{}},action)=>{
    switch(action.type){
    case USER_DETAILS_REQUEST:
    
    return {...state, loading:true}
    
    case USER_DETAILS_SUCCESS:
        return{loading:false, user:action.payload}   
    
    case USER_DETAILS_FAIL:
        return{loading:false, error:action.payload}
    case USER_DETAILS_RESET:
        return{user:{}}
     
    
    default:
        return state

}
}

export const userUpdateReducer= (state={},action)=>{
    switch(action.type){
    case USER_UPDATE_REQUEST:
    
    return {loading:true}
    
    case USER_UPDATE_SUCCESS:
        return{loading:false,success:true, userInfo:action.payload}   
    
    case USER_UPDATE_FAIL:
        return{loading:false, error:action.payload} 
    case USER_UPDATE_RESET:
        return{}     

    default:
        return state

}
}

export const userListReducer= (state={users:[]},action)=>{
    switch(action.type){
    case USER_LIST_REQUEST:
    
    return {loading:true}
    
    case USER_LIST_SUCCESS:
        return{loading:false,users:action.payload}   
    
    case USER_LIST_FAIL:
        return{loading:false, error:action.payload} 
    case USER_LIST_RESET:
        return{}     

    default:
        return state

}
}

export const userDeleteReducer= (state={},action)=>{
    switch(action.type){
    case USER_DELETE_REQUEST:
    
    return {loading:true}
    
    case USER_DELETE_SUCCESS:
        return{loading:false,success:true}   
    
    case USER_DELETE_FAIL:
        return{loading:false, error:action.payload} 
    default:
        return state

}
}

export const userGetReducer= (state={user:[]},action)=>{
    switch(action.type){
    case USER_GET_REQUEST:
    
    return {loading:true}
    
    case USER_GET_SUCCESS:
        return{loading:false,user:action.payload}   
    
    case USER_GET_FAIL:
        return{loading:false, error:action.payload} 
    default:
        return state

}
}

export const userModifyReducer= (state={user:{}},action)=>{
    switch(action.type){
    case USER_MODIFY_REQUEST:
    
    return {loading:true}
    
    case USER_MODIFY_SUCCESS:
        return{loading:false,success:true}   
    
    case USER_MODIFY_FAIL:
        return{loading:false, error:action.payload} 
    case USER_MODIFY_RESET:
            return{user:{}}     
    default:
        return state

}
}

export const liveCampaignReducer= (state={live:[]},action)=>{
    switch(action.type){
    case LIVE_GET_REQUEST:
    
    return {loading:true}
    
    case LIVE_GET_SUCCESS:
        return{loading:false,live:action.payload}   
    
    case LIVE_GET_FAIL:
        return{loading:false, error:action.payload} 
    case LIVE_GET_RESET:
        return{}     

    default:
        return state

}
}

export const singleCampaignReducer= (state={campaign:{}},action)=>{
    switch(action.type){
    case CAMPAIGN_GET_REQUEST:
    
    return {loading:true}
    
    case CAMPAIGN_GET_SUCCESS:
        return{loading:false,campaign:action.payload}   
    
    case CAMPAIGN_GET_FAIL:
        return{loading:false, error:action.payload}     

    default:
        return state

}
}

export const liveKickReducer= (state={kick:[]},action)=>{
    switch(action.type){
    case KICK_GET_REQUEST:
    
    return {loading:true}
    
    case KICK_GET_SUCCESS:
        return{loading:false,kick:action.payload}   
    
    case KICK_GET_FAIL:
        return{loading:false, error:action.payload}   

    default:
        return state

}
}