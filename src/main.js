/* eslint-disable */
import API from './apis/oms-api'
import ChildRoutes from './router/router'
import './assets/css/oms-theme.scss'

// --- 微服务环境 ---
if (window.AppData) {
  window.AppData.registerChildRoutes(ChildRoutes)
  window.AppData.registerModule(API.KEY)
}