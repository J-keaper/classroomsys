import axios from "axios/index";

class API {
    static async login(params){
        return await API.post("/api/user/login",params);
    }

    static async getCommonConstant(){
        return await API.get("/api/common/constant");
    }

    static async getUserList(searchKey,searchType,pageCount,pageSize){
        return await API.get("/api/user/list",
            {sk:searchKey,st:searchType,pc:pageCount,ps:pageSize});
    }

    static async updateUserInfo(account,phone,email){
        let params = new URLSearchParams();
        params.append("a",account);
        params.append("p",phone);
        params.append("e",email);
        return await API.post("/api/user/update",params);
    }

    static async updateUserPassword(account,password){
        let params = new URLSearchParams();
        params.append("a",account);
        params.append("pwd",password);
        return await API.post("/api/user/update",params);
    }

    static async getClassroomList(searchCampus,searchBuilding, searchStatus,searchNumber,pageCount,pageSize){
        return await API.get("/api/classroom/list",
            {sc:searchCampus,sb:searchBuilding,ss:searchStatus,sn:searchNumber,pc:pageCount,ps:pageSize});
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
        params.append("aid","1");//TODO
        params.append("pass",result === "pass");
        params.append("opi",opinion);
        if(classroom && classroom !== ""){
            params.append("cla",classroom);
        }
        return await API.post("/api/apply/audit",params);
    }

    static async submitApply(applyPurpose,applyReason,applyCapacity,startTime,endTime){
        let params = new URLSearchParams();
        params.append("aid","1");//TODO
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
                completeUrl += value + "=" + params[value];
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