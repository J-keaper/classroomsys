import axios from 'axios';

// axios 配置

// http request 拦截器
axios.interceptors.request.use(
    config => {
        const token = localStorage.getItem("token");
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    err => {
        return Promise.reject(err);
    });

// http response 拦截器
axios.interceptors.response.use(
    response => {
        if(response.headers.token){
            localStorage.setItem("token",response.headers.token);
        }
        return response;
    },
    error => {
        if (error.response) {
            switch (error.response.status) {
                case 401:
                    // 401 清除token信息并跳转到登录页面
                    localStorage.removeItem("token");
                    window.location.href = "/login";
            }
        }
        return Promise.reject(error.response.data)
    });

export default axios;