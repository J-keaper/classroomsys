import {
    FETCHING_DATA, RECEIVED_APPLY_LIST, RECEIVED_AUDIT_APPLY, RECEIVED_CLASSROOM_LIST, RECEIVED_COMMON_TYPE,
    RECEIVED_USER_INFO,
    RECEIVED_USER_LIST,
} from "./types";
import API from '../../api';

const defaultPageSize = 20;

export function getUserInfo() {
    return async (dispatch) => {
        dispatch(fetchingData(true));
        let result = await API.getUserInfo();
        dispatch(receivedUserInfo(result.ret ? result.data : {}));
        dispatch(fetchingData(false));
    };
}

export function getCommonConstant() {
    return async (dispatch) => {
        dispatch(fetchingData(true));
        let result = await API.getCommonConstant();
        dispatch(receivedCommonType(result.ret ? result.data : {}));
        dispatch(fetchingData(false));
    };
}

export function getUserList(searchKey = "" , searchType = -1,pageCount = 1,pageSize = defaultPageSize) {
    return async (dispatch)=>{
        dispatch(fetchingData(true));
        let result = await API.getUserList(searchKey,searchType,pageCount,pageSize);
        dispatch(receivedUserList(result.ret ? result.data : {}));
        dispatch(fetchingData(false));
    }
}


export function getClassroomList(searchCampus = -1, searchBuilding = -1,
                                 searchStatus = -1, searchNumber = "",
                                 pageCount = 1,pageSize = defaultPageSize) {
    return async (dispatch)=>{
        dispatch(fetchingData(true));
        let result = await API.getClassroomList(searchCampus,searchBuilding, searchStatus,searchNumber, pageCount,pageSize);
        dispatch(receivedClassroomList(result.ret ? result.data : {}));
        dispatch(fetchingData(false));
    }
}

export function getApplyList( searchApplicant = "", searchStatus = -1, pageCount = 1,pageSize = defaultPageSize) {
    return async (dispatch)=>{
        dispatch(fetchingData(true));
        let result = await API.getApplyList(searchApplicant,searchStatus,pageCount,pageSize);
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

const receivedUserInfo = (userInfo) => ({
    type:RECEIVED_USER_INFO,
    userInfo
});

const receivedCommonType = (data) => ({
    type:RECEIVED_COMMON_TYPE,
    data
});

const receivedUserList = (user) => ({
    type:RECEIVED_USER_LIST,
    user
});

const receivedClassroomList = (classroom) => ({
   type:RECEIVED_CLASSROOM_LIST,
   classroom
});

const receivedApplyList = (apply) => ({
    type:RECEIVED_APPLY_LIST,
    apply
});

const receivedAuditApply = (auditApply) => ({
    type:RECEIVED_AUDIT_APPLY,
    auditApply
});
