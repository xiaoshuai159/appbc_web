import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)
const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}

const routes = [
  {
    path: '/',
    redirect: '/home'
  },
  {
    path: '/home',
    name: 'Home',
    component: () => import('../components/Home/Index.vue')
  },
  {
    path: '/task_management/test_task',
    name: 'TaskManagement',
    component: () => import('../components/TaskManagement/Index.vue')
  },
  {
    path: '/task_management/create_task',
    name: 'CreateTask',
    component: () => import('../components/TaskManagement/CreateTask.vue')
  },
  {
    path: '/task_management/result_query',
    name: 'ResultQuery',
    component: () => import('../components/TaskManagement/ResultQuery.vue')
  },
  {
    path: '/task_management/app_result_query',
    name: 'AppResultQuery',
    component: () => import('../components/TaskManagement/AppResultQuery.vue')
  },
  {
    path: '/task_management/fxxqResult',
    name: 'fxxqResult',
    component: () => import('../components/TaskManagement/fxxqResult.vue')
  },
  {
    path: '/task_management/more_obj',
    name: 'MoreObj',
    component: () => import('../components/TaskManagement/MoreObj.vue')
  },
  {
    path: '/task_management/analyse_task',
    name: 'AnalyseTask',
    component: () => import('../components/TaskManagement/AnalyseTaskPage.vue')
  },
  {
    path: '/task_management/patrol_task',
    name: 'PatrolTask',
    component: () => import('../components/TaskManagement/PatrolTaskPage.vue')
  },
  {
    path: '/client_management',
    component: () => import('../components/ClientManagement/Index.vue'),
    children: [
      {
        path: '',
        name: 'ClientManagement',
        redirect: 'client_app',
      },
      {
        path: 'client_pc',
        name: 'ClientManagementPC',
        component: () => import('../components/ClientManagement/ClientPC.vue')
      },
      {
        path: 'client_app',
        name: 'ClientManagementAPP',
        component: () => import('../components/ClientManagement/ClientApp.vue')
      },
    ]
  },
  {
    path: '/client_management/client_pc_operate',
    name: 'ClientPCOperate',
    component: () => import('../components/ClientManagement/ClientPCOperate.vue')
  },
  {
    path: '/client_management/client_app_detail_modify',
    name: 'ClientAppDetailModify',
    component: () => import('../components/ClientManagement/ClientAppDetailModify.vue')
  },
  {
    path: '/result_report',
    component: () => import('../components/ResultReport/Index.vue'),
    children: [
      {
        path: '',
        name: 'ResultReport',
        redirect: 'result_app',
      },
      {
        path: 'result_pc',
        name: 'ResultReportPC',
        component: () => import('../components/ResultReport/ResultPC.vue')
      },
      {
        path: 'result_app',
        name: 'ResultReportAPP',
        component: () => import('../components/ResultReport/ResultApp.vue')
      },
    ]
  },
  {
    path: '/system_config/app_probe',
    name: 'SystemConfigAppProbe',
    component: () => import('../components/SystemConfig/AppProbe.vue')
  },
  {
    path: '/system_config/add_probe_app',
    name: 'AddProbeApp',
    component: () => import('../components/SystemConfig/AddProbeApp.vue')
  },
  {
    path: '/system_config/app_crawl',
    name: 'SystemConfigAppCrawl',
    component: () => import('../components/SystemConfig/AppCrawl.vue')
  },
  {
    path: '/system_config/app_crawl_config',
    name: 'AppCrawlConfig',
    component: () => import('../components/SystemConfig/AppCrawlConfig.vue')
  },
  {
    path: '/system_config/update_crawl_app',
    name: 'UpdateCrawlApp',
    component: () => import('../components/SystemConfig/UpdateCrawlApp.vue')
  },
  {
    path: '/system_config/app_account',
    name: 'SystemConfigAppAccount',
    component: () => import('../components/SystemConfig/AppAccount.vue')
  },
  {
    path: '/system_config/add_app_account',
    name: 'AddAppAccount',
    component: () => import('../components/SystemConfig/AddAppAccount.vue')
  },
  {
    path: '/system_config/apk_manage',
    name: 'SystemConfigApkManage',
    component: () => import('../components/SystemConfig/ApkManage.vue')
  },
  {
    path: '/system_config/add_apk_manage',
    name: 'AddApkManage',
    component: () => import('../components/SystemConfig/AddApkManage.vue')
  },
]

const router = new VueRouter({
  // mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
