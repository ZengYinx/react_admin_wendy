import axios from "axios";
import store from '../../src/redux/store'
axios.defaults.baseURL = 'http://localhost:8000';

// 接口请求的拦截；
axios.interceptors.request.use((config) => {
    // console.log(store, 'store')
    store.dispatch({
        type: 'change_loading',
        payload: true
    });
    return config;
}, function(error) {
    return error;
});

axios.interceptors.response.use((response) => {
    store.dispatch({
        type: 'change_loading',
        payload: false
    });
    return response;
}, function(error) {
    return error;
});