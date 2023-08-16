import api from "./http.js";
// 乘车信息-新增
export function saveEvaluate(params) {
    return api({
        url: `/saveEvaluate`,
        headers: {
            isToken: false,
        },
        loading:true,
        method: "post",
        data: params,
    });
}