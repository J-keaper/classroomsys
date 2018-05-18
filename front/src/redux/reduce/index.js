import {
    FETCHING_DATA,
    RECEIVED_APPLY_LIST, RECEIVED_AUDIT_APPLY, RECEIVED_CLASSROOM_LIST, RECEIVED_COMMON_TYPE, RECEIVED_USER_APPLY,
    RECEIVED_USER_INFO,
    RECEIVED_USER_LIST
} from "../action/types";


const initState = {
    common:{

    },
    user:{},
    classroom:{},
    apply:{}
};


const reducer = (state = initState, action) => {
    switch (action.type){
        case FETCHING_DATA:
            return {...state,common:{...state.common,fetching:action.fetching}};
        case RECEIVED_USER_INFO:
            return {...state,user:{...state.user,loginedUser:action.userInfo}};
        case RECEIVED_USER_APPLY:
            return {...state,user:{...state.user,apply:action.userApply}};
        case RECEIVED_COMMON_TYPE:
            return {...state,common:{...state.common,...action.data}};
        case RECEIVED_USER_LIST:
            return {...state,user:{...state.user,
                    userList:action.user.userList,
                    userCount:action.user.userCount}};
        case RECEIVED_CLASSROOM_LIST:
            return {...state,classroom:{...state.classroom,
                    classroomList:action.classroom.classroomList,
                    classroomCount:action.classroom.classroomCount}};
        case RECEIVED_APPLY_LIST:
            return {...state,apply:{...state.apply,
                    applyCount:action.apply.applyCount,
                    applyList:action.apply.applyList}};
        case RECEIVED_AUDIT_APPLY:
            return {...state,apply:{...state.apply,auditApply:action.auditApply}};
        default:
            return state;
    }
};


export default reducer;