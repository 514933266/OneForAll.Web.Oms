const API = {
  KEY: 'OneForAll.Oms',
  // 微信支付设置
  WXPAY_SETTING: {
    URL: '/api/OmsWxPaySettings',
    BATCH_DELETE: '/api/OmsWxPaySettings/Batch/IsDeleted',
    FILE: id => `/api/OmsWxPaySettings/${id}/Certificates`
  }
}

export default API
