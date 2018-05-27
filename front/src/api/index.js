import axios from "../axios";

class API {
    static async login(params){
        return await API.post("/api/user/login",params);
    }

    static async getUserInfo(){
        return await API.get("/api/user/info");
}

    static async getUserApply(){
        return await API.get("/api/user/apply");
    }

    static  async forgetPassword(email){
        return await API.get("/api/user/password/forget",{e:email});
    }

    static async resetPassword(token,password){
        let params = new URLSearchParams();
        params.append("t",token);
        params.append("p",password);
        return await API.post("/api/user/password/reset",params);
    }

    static async getCommonConstant(){
        return await API.get("/api/common/constant");
    }

    static async getUserList(searchKey,searchType,pageCount,pageSize){
        return await API.get("/api/user/list",
            {sk:searchKey,st:searchType,pc:pageCount,ps:pageSize});
    }

    static async updateUserInfo(phone,email,account){
        let params = new URLSearchParams();
        params.append("p",phone);
        params.append("e",email);
        if(account !== undefined){
            params.append("a",account);
        }
        return await API.post("/api/user/update",params);
    }

    static async updatePasswordByOld(oldPassword,newPassword){
        let params = new URLSearchParams();
        params.append("op",oldPassword);
        params.append("np",newPassword);
        return await API.post("/api/user/update/password",params);
    }

    static async updateUserPassword(account,password){
        let params = new URLSearchParams();
        params.append("a",account);
        params.append("pwd",password);
        return await API.post("/api/user/update",params);
    }

    static async importUserList(userList){
        let params = new URLSearchParams();
        params.append("ul",JSON.stringify(userList));
        return await API.post("/api/user/import",params);
    }


    static async getClassroomList(searchCampus,searchBuilding, searchStatus,searchNumber,pageCount,pageSize){
        return await API.get("/api/classroom/list",
            {sc:searchCampus,sb:searchBuilding,ss:searchStatus,sn:searchNumber,pc:pageCount,ps:pageSize});
    }


    static async importClassroomList(classroomList){
        let params = new URLSearchParams();
        params.append("cl",JSON.stringify(classroomList));
        return await API.post("/api/classroom/import",params);
    }

    static async getCanApplyClassroom(applyId){
        return await API.get("/api/apply/audit/advice",{id:applyId})
    }


    static async addOpenSchedule(classroomList,startTime,endTime){
        return await this.addClassroomSchedule(classroomList,startTime,endTime,2);
    }

    static async addClassroomSchedule(classroomList,startTime,endTime,status) {
        let params = new URLSearchParams();
        params.append("cl", JSON.stringify(classroomList));
        params.append("st", startTime);
        params.append("et", endTime);
        params.append("s", status);
        return await API.post("/api/classroom/schedule/add",params);
    }

    static async getApplyList(searchApplicant,searchStatus,pageCount,pageSize){
        return await API.get("/api/apply/list",
            {sa:searchApplicant, ss:searchStatus, pc:pageCount,ps:pageSize});
    }

    static async getAuditApply(id){
        return await API.get("/api/apply/"+id);
    }

    static async submitAudit(id,result,opinion,classroom){
        let params = new URLSearchParams();
        params.append("id",id);
        params.append("pass",result === "pass");
        params.append("opi",opinion);
        if(classroom && classroom !== ""){
            params.append("cla",classroom);
        }
        return await API.post("/api/apply/audit",params);
    }

    static async submitApply(applyPurpose,applyReason,applyCapacity,startTime,endTime){
        let params = new URLSearchParams();
        params.append("ap",applyPurpose);
        params.append("ar",applyReason);
        params.append("ac",applyCapacity);
        params.append("st",startTime);
        params.append("et",endTime);
        return await API.post("/api/apply/add",params);
    }

    /**
     * 封装axios get请求接口
     * @param url
     * @param params
     */
    static async get(url,params){
        let completeUrl = url;
        if(params !== undefined && params !== null){
            Object.keys(params).map((value,index) => {
                completeUrl += index === 0 ? "?" : "&";
                completeUrl += value + "=" + encodeURIComponent(params[value]);
            });
        }
        let result = await axios.get(completeUrl);
        if(result.status === 200){
            return result.data || {};
        }
        return {};
    }

    /**
     * 封装axios post请求接口
     * @param url
     * @param params 参数如果是object,request content type 为 json形式
     *               参数也可以手动拼装键值对,content type 为 表单形式
     */
    static async post(url,params){
        let result = await axios.post(url, params);
        if(result.status === 200){
            return result.data || {};
        }
        return {};
    }

}

export default API;