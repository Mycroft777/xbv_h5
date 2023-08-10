import api from "./http.js";
// 乘车信息-新增
export function saveRiding(params) {
    return api({
        url: `/saveRiding`,
        headers: {
            isToken: false,
        },
        loading:true,
        method: "post",
        data: params,
    });
}
// 获取站点信息
export function queryStation() {
    return api({
        url: `/queryStation`,
        headers: {
            isToken: false,
        },
        loading:true,
        method: "post",
        data: {},
    });
}
// 获取车辆位置信息
export function queryCar() {
    return api({
        url: `/queryStation`,
        headers: {
            isToken: false,
        },
        loading:false,
        method: "post",
        data: {},
    });
}