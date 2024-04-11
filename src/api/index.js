const api = {
    // 获取token
    //GetToken: "/api/token/createTokenPayload",
    //GetUserToken: "/login",                            // 获取用户登录token
    // 首页
    // GetPCDeviceState: "/api/pc/statistics/state",      // 固网设备数量
    // GetPCStatisticsMap: "/api/pc/statistics/map",      // 固网地图数据
    // 任务管理
    // GetTaskNode: "/api/pc/client/notePage",            // 获取节点列表 pc
    GetAppTaskNode: "/api/client/list1",               // 获取节点列表 app
    CreateTask: "/api/task/create",                    // 创建任务
    GetTaskDetailByID: "/api/task/showPage",           // 根据任务ID获取任务详情
    GetAppTaskContentByID: "/api/task/taskContent",    // 根据任务ID获取APP 拨测目标
    // GetTaskContentByID: "/api/pc/task/getTaskContents", // 根据任务ID获取PC 拨测目标
    // GetTaskResult: "/api/pc/task/result/listPage",     // 获取PC 拨测结果
    // GetResultScreenshot: "/api/pc/task/result/download",// 获取拨测结果异常图片
    // 客户端管理
    // GetClientList: "/api/pc/client/list",              // 列表展示客户端
    // ModifyClient: "/api/pc/client/modify",             // 客户端信息修改
    // CreateClient: "/api/pc/client/add",                // 新增客户端
    // DeleteClient: "/api/pc/client/delete",             // 删除客户端
    // GetClientDict: "/api/pc/client/dataDictionary",    // 数据字典 - 新增客户端
    // GetSingleClientData: "/api/pc/client/single",      // 单个客户端信息
    // // 结果报表
    // GetStatisticsAll: "/api/pc/statistics/all",        // 饼状图
    // GetStatisticsTrend: "/api/pc/statistics/trend",    // 折线图
    // GetStatisticsFloor: "/api/pc/statistics/floor",    // 底线网站
    // GetStatisticsCity: "/api/pc/statistics/city",      // 地域
    // GetStatisticsKey: "/api/pc/statistics/key",        // 重点网站
    // GetStatisticsISP: "/api/pc/statistics/isp",        // 运营商
    // 结果报表-app
    GetStatisticsAllApp: "/api/statistics/all",        // 饼状图
    GetStatisticsTrendApp: "/api/statistics/trend",    // 折线图
    GetStatisticsApp: "/api/statistics/app",           // app
    GetStatisticsCityApp: "/api/statistics/city",      // 地域
    GetStatisticsISPApp: "/api/statistics/isp",        // 运营商
};

export default api;