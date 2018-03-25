import {FETCHING_DATA, RECEIVED_APPLY_LIST, RECEIVED_CLASSROOM_LIST, RECEIVED_USER_LIST,} from "./types";

const defaultPageSize = 20;

export function getUserList(pageCount,pageSize = defaultPageSize) {
    return async (dispatch)=>{

    }
}

export function getClassroomList(pageCount,pageSize = defaultPageSize) {
    return async (dispatch)=>{

    }
}

export function getApplyList(pageCount,pageSize = defaultPageSize) {
    return async (dispatch)=>{

    }
}


const fetchingFata = (fetching) => ({
    type:FETCHING_DATA,
    fetching
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
