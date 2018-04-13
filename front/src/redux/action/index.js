import {
    FETCHING_DATA, RECEIVED_APPLY_LIST, RECEIVED_AUDIT_APPLY, RECEIVED_CLASSROOM_LIST, RECEIVED_COMMON_TYPE,
    RECEIVED_USER_LIST,
} from "./types";
import API from '../../api';

const defaultPageSize = 20;

export function getCommonType() {
    return async (dispatch) => {
        dispatch(fetchingData(true));
        let result = await API.getCommonType();
        dispatch(receivedCommonType(result.ret ? result.data : {}));
        dispatch(fetchingData(false));
    };
}

export function getUserList(pageCount = 1,pageSize = defaultPageSize) {
    return async (dispatch)=>{
        dispatch(fetchingData(true));
        let result = await API.getUserList(pageCount,pageSize);
        dispatch(receivedUserList(result.ret ? result.data : {}));
        dispatch(fetchingData(false));
    }
}


export function getClassroomList(pageCount = 1,pageSize = defaultPageSize) {
    return async (dispatch)=>{
        dispatch(fetchingData(true));
        let result = await API.getClassroomList(pageCount,pageSize);
        dispatch(receivedClassroomList(result.ret ? result.data : {}));
        dispatch(fetchingData(false));
    }
}

export function getApplyList(pageCount = 1,pageSize = defaultPageSize) {
    return async (dispatch)=>{
        dispatch(fetchingData(true));
        let result = await API.getApplyList(pageCount,pageSize);
        console.log(result);
        dispatch(receivedApplyList(result.ret ? result.data : {}));
        dispatch(fetchingData(false));
    }
}


export function getAuditApply(id) {
    return async (dispatch,getState)=>{
        let found = false;
        if(getState().apply && getState().apply.applyList){
            let applyList = getState().apply.applyList;
            for(let i in applyList){
                if(applyList[i].id === parseInt(id)){
                    found = true;
                    dispatch(receivedAuditApply(applyList[i]));
                }
            }
        }
        if(!found){
            dispatch(fetchingData(true));
            let result = await API.getAuditApply(id);
            dispatch(receivedAuditApply(result.ret ? result.data : {}));
            dispatch(fetchingData(false));
        }
    }
}

const fetchingData = (fetching) => ({
    type:FETCHING_DATA,
    fetching
});

const receivedCommonType = (data) => ({
    type:RECEIVED_COMMON_TYPE,
    data
});

const receivedUserList = (userList) => ({
    type:RECEIVED_USER_LIST,
    userList
});

const receivedClassroomList = (classroomList) => ({
   type:RECEIVED_CLASSROOM_LIST,
   classroomList
});

const receivedApplyList = (applyList) => ({
    type:RECEIVED_APPLY_LIST,
    applyList
});

const receivedAuditApply = (auditApply) => ({
    type:RECEIVED_AUDIT_APPLY,
    auditApply
});
