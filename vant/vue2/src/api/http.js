import axios from "axios";
import store from '@/store';
import { Notify } from 'vant';
import Vue from 'vue';
Vue.use(Notify);

// 登录获取的 token 暂时不需要
let token = "666";
axios.defaults.headers["Content-Type"] = "application/json;charset=utf-8";
axios.defaults.headers["Access-Control-Allow-Origin"] = "*";
const service = axios.create({
    baseURL: process.env.VUE_APP_API_BASE_URL,
    timeout: 10 * 1000,
});

// 请求拦截
service.interceptors.request.use(
    (config) => {
        if(config.loading)
            store.commit('showLoading')
        const isToken = (config.headers || {}).isToken == true;
        if (token && isToken) {
            config.headers["Authorization"] = `Bearer ${token}`;
        }
        return config;
    },
    (err) => {
            store.commit('hideLoading')
        console.log(err);
        return Promise.reject(err);
    }
);

// // 响应拦截
service.interceptors.response.use(
    (res) => {
        store.commit('hideLoading')
        const code = res.data.code || 200;
        const msg = res.data.msg;
        if (+code !== 200) {
            Notify({ type: 'warning', message: `操作失败，${msg}` });
            return res.data;
        } else {
            return res.data;
        }
    },
    (err) => {
        store.commit('hideLoading')
        let message = '服务器忙，请稍后再试...';
        if(err.response){
            switch (+err.response.data.code) {
                case 401:
                    message = '登录超时，请重新登录...';
                    break;
                case 403:
                    message = '你没有权限访问，请联系管理员...';
                    break;
                case 404:
                    message = '您访问的资源不存在...';
                    break;
                case 405:
                    message = '服务器,请求方式不支持...';
                    break;
                case 408:
                    message = '请求超时,请稍后再试...';
                    break;
                case 500:
                    message = '服务器忙，请稍后再试...';
                    break;
                case 504:
                    message = '网络超时，请检查API地址是否可访问...';
                    break;
                default:
                    break;
            }
        }
        Notify({ type: 'warning', message: message });
        return Promise.reject(err);
    }
);

export default service;