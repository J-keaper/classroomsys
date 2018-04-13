import {
    RECEIVED_APPLY_LIST, RECEIVED_AUDIT_APPLY, RECEIVED_CLASSROOM_LIST, RECEIVED_COMMON_TYPE,
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
        case RECEIVED_COMMON_TYPE:
            return {...state,common:{...state.common,...action.data}};
        case RECEIVED_USER_LIST:
            return {...state,user:{...state.user,userList:action.userList}};
        case RECEIVED_CLASSROOM_LIST:
            return {...state,classroom:{...state.classroom,classroomList:action.classroomList}};
        case RECEIVED_APPLY_LIST:
            return {...state,apply:{...state.apply,applyList:action.applyList}};
        case RECEIVED_AUDIT_APPLY:
            return {...state,apply:{...state.apply,auditApply:action.auditApply}};
        default:
            return state;
    }
};


export default reducer;