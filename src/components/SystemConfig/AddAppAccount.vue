<template>
    <div id="probe-app-detail-modify" class="el-main grid-content">
        <el-breadcrumb separator="/">
            <!-- <el-breadcrumb-item :to="{ path: '/task_management' }">系统配置</el-breadcrumb-item> -->
            <el-breadcrumb-item>系统配置</el-breadcrumb-item>
            <el-breadcrumb-item>APP账号管理</el-breadcrumb-item>
            <el-breadcrumb-item breadcrumb-item>新增APP账号</el-breadcrumb-item>
        </el-breadcrumb>
        <div class="probe-app-go-back" @click="goBackProbeApp">
            <span>返回上一级</span>
            <i class="el-icon-arrow-left"></i>
        </div>
        <!-- 新增App -->
        <div class="probe-app-form">
            <div class="probe-app-form-header">新增APP账号</div>
            <div class="probe-app-form-info">
                <el-form ref="probeAppForm" :inline="true" :rules="probeAppFormRules" :model="probeAppForm"
                    class="demo-form-inline">
                    <el-form-item label="账号" prop="username">
                        <el-input placeholder="请输入App账号" v-model="probeAppForm.username" clearable>
                        </el-input>
                    </el-form-item>
                    <el-form-item label="密码" prop="password">
                        <el-input placeholder="请输入App密码" v-model="probeAppForm.password" clearable>
                        </el-input>
                    </el-form-item>

                    <!--app列表+模糊匹配-->
                    <el-form-item label="APP名称" prop="probeApp" style="width: 100%">
                        <el-checkbox class="quanxuan" v-model="checkAll" :indeterminate="isIndeterminateModel"
                            @change="handleCheckAllAppChange">全选&nbsp;&nbsp;&nbsp;
                        </el-checkbox>
                        <el-select @change="$forceUpdate()" v-model="probeAppForm.probeApp" filterable
                            :reserve-keyword="true" multiple placeholder="请选择" v-if="selectApp">
                            <el-option v-for="item in appList" :key="item.id" :label="`${item.appName}_v${item.appVer}`"
                                :value="item.appName">
                            </el-option>
                        </el-select>
                    </el-form-item>

                </el-form>
            </div>
            <div class="probe-app-form-button">
                <el-button type="primary" @click="submitProbeAppForm()">保存</el-button>
                <el-button type="info" @click="resetProbeAppForm()">取消</el-button>
            </div>
        </div>
    </div>
</template>
<script>
import "@/assets/css/breadcrumb-tabs-style.css";
export default {
    name: "AddProbeApp",
    data() {
        return {
            probeAppForm: {
                username: "",
                password: "",
                id: "",
                probeApp: [],
                apps: "",
            },
            selectApp: true, //全选app
            checkAll: false, //全选app
            isIndeterminateModel: false, //全选app
            appList: [], //所有app列表
            isIndeterminate: false,
            probeAppFormRules: {
                username: [
                    { required: true, message: "请输入app账号", trigger: "change" },
                ],
                password: [
                    { required: true, message: "请输入app密码", trigger: "change" },
                ],
                probeApp: [
                    { required: true, message: "请选择拨测APP", trigger: "blur" },
                ],
            },
            id: 0,
            from: "",  //from页面来源,table:App列表页面，update:更新App信息页面
        };
    },
    created() {
        console.log(this.$route.query)
        this.getAppList();
        this.from = this.$route.query.from;
        if (this.$route.query.from == 'update') { //获取浏览器url的参数，from页面来源,table:App列表页面，update:更新App信息页面 
            this.id = parseInt(this.$route.query.id);
            this.selectProbeAppInfo(this.id); //更新时初始状态：显示单个App的信息
        }
    },
    mounted() {
        window.addEventListener("keydown", this.handleSearch);
    },
    destroyed() {
        window.removeEventListener("keydown", this.handleSearch, false); //销毁回车事件，如果不销毁，在其他页面敲回车也会执行回车登录操作。
    },
    methods: {
        //返回上一级
        goBackProbeApp() {
            this.$router.push({
                path: "/system_config/app_account",
                query: {
                    from: "resultTable", //返回参数 //页面来源是App列表还是修改App信息
                    page: this.$route.query.page,
                    pageSize: this.$route.query.pageSize,
                },
            });
        },
        //查询单个App信息
        async selectProbeAppInfo(id) {
            const { data: res } = await this.$http.get("/appAccount/detail?id=" + id);
            if (res.code == 200) {
                this.probeAppForm = res.data;
                var appArray = res.data.apps.split(",");
                this.probeAppForm.probeApp = appArray;
            }
        },
        //验证按钮
        async submitProbeAppForm() {
            this.$refs.probeAppForm.validate((valid) => {
                if (valid) {
                    this.submitForm();
                }
            });
        },

        //新增，修改信息
        async submitForm() {
            this.probeAppForm.apps = this.probeAppForm.probeApp.toString();
            if (this.from == 'table') {
                const { data: res } = await this.$http.post("/appAccount/edit", this.probeAppForm);
                // const { data: res } = await this.$http.post("/app/edit?appScriptName=" + this.probeAppForm.appScriptName + "&appName=" + this.probeAppForm.appName + "&appVer=" + this.probeAppForm.appVer + "&remarks=" + this.probeAppForm.remarks + "&file=" + formData);
                if (res.code == 200) {
                    this.$message({
                        message: "添加成功",
                        type: "success",
                    });
                    this.$router.push("/system_config/app_account");
                } else {
                    this.$message("添加失败");
                }
            } else { //修改信息
                this.$confirm("此操作将修改APP信息, 是否继续?", "提示", {
                    confirmButtonText: "确定",
                    cancelButtonText: "取消",
                    type: "warning",
                }).then(async () => {
                    const { data: res } = await this.$http.post("/appAccount/edit", this.probeAppForm);
                    if (res.code == 200) {
                        this.$message({
                            message: "修改成功",
                            type: "success",
                        });
                        this.$router.push("/system_config/app_account");
                    } else {
                        this.$message("修改失败");
                    }
                }).catch(() => {
                    this.$message("已取消修改");
                });
            }
        },

        //取消修改
        async resetProbeAppForm() {
            console.log("this.from",this.from)
            if (this.from == 'table') { //新增
                this.probeAppForm.username = "",
                this.probeAppForm.password = "",
                this.probeAppForm.probeApp = []
            } else { //修改
                this.selectProbeAppInfo(this.id);
            }
        },

        //加载app列表
        async getAppList() {
            const { data: res } = await this.$http.get(
                "/app/all",
                {
                    params: {
                        page: 1,
                        pageSize: 100000, //默认传个极大值，即可返回所有的数据
                    },
                }
            );
            if (res.code == 0) {
                this.appList = res.dataList;
            }
        },

        //全选所有APP
        handleCheckAllAppChange(val) {
            console.log("handleCheckAllAppChange", val);
            const all = this.appList.map((item) => {
                return item.appName; //向后台传app脚本文件名
            });
            this.probeAppForm.probeApp = val ? all : []; //app脚本名称列表
            console.log(this.probeAppForm.probeApp);
            this.isIndeterminateModel = false;
            this.selectApp = false; //下拉菜单的所有app被选中
            this.$nextTick().then(() => {
                this.selectApp = true;
            });
        },
        //app选择变化
        handleCheckedmodelChange(value) {
            console.log("handleCheckedmodelChange", value);
            let checkedCount = value.length;
            this.checkAll = checkedCount === this.appList.length;
            this.isIndeterminateModel = checkedCount > 0 && checkedCount < this.appList.length;
        },
    },
};
</script>
<style lang="less" scoped>
:deep(.el-select .el-input) {
    width: 100% !important;
}

.probe-app-go-back {
    font-family: "Microsoft YaHei";
    font-style: normal;
    font-weight: 400;
    font-size: 14px;
    line-height: 22px;
    color: #1675d5;
    float: right;
    margin-top: -34px;
    cursor: pointer;

    i {
        font-weight: 400;
        font-size: 14px;
        line-height: 22px;
        color: #1675d5;
    }
}

.probe-app-form {
    background: #ffffff;
    box-shadow: 0 0 8px #cecece;
    padding: 20px;
    display: flex;
    margin-bottom: 20px;
    float: right;
    width: calc(100% - 110px);
    // height: 740px;
    display: flex;
    flex-direction: column;

    .probe-app-form-header {
        height: 40px;
        font-family: "Microsoft YaHei";
        // font-style: normal;
        font-weight: 700;
        font-size: 14px;
        line-height: 18px;
        align-items: center;
        color: #333333;
        padding-left: 20px;
        border-bottom: 1px solid #dedede;
    }

    .probe-app-form-info {
        flex: 1;
        padding: 20px;
    }

    .probe-app-form-button {
        height: 40px;
        padding: 20px;
        padding: 24px 20px 4px 0px;
        border-top: 1px solid #dedede;
        display: flex;
        justify-content: end;
    }

    .upload-file {
        display: inline-block;
        // position: absolute;

        :deep(.el-upload) {
            border: 1px solid #1675d5;
            border-radius: 4px;
            padding: 0px 16px;

        }

        .el-upload__tip {
            font-size: 14px;
        }

        i {
            color: #1675d5;
            float: left;
            line-height: 40px;
        }

        .upload-file-text {
            font-family: "Microsoft YaHei";
            font-style: normal;
            font-weight: 400;
            font-size: 14px;
            width: 84px;
            color: #1675d5;
        }
    }
}

// 面包屑
:deep(.el-breadcrumb__item:last-child .el-breadcrumb__inner) {
    color: #1675d5 !important;
}

// 表单
.el-form--inline .el-form-item {
    width: 100%;
    margin-right: 24px;
}

:deep(.el-form--inline .el-form-item__content) {
    width: 100%;
}

:deep(.el-form-item__label) {
    color: #333333 !important;
    background-color: #ffffff !important;
    border: none !important;
    padding: 0px !important;
}

.el-select {
    width: 100%;
}

// 按钮
.el-button {
    color: #ffffff;
    width: 70px;
    height: 40px;
    border-radius: 4px;
}

.el-button--primary {
    background: #162b5b;
    border-color: #162b5b;
}

.el-button--info {
    color: #333333;
    background: #FFFFFF;
    border-color: #d3d4dd;
}

.orange {
    color: #f39300;
}


.quanxuan {
    display: block;
    width: 55px;
}
</style>
  