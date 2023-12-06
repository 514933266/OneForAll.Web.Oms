<template>
  <el-container>
    <el-header class="header">
      <span>
        <search-input enterable v-model="searchOption.key" @click="search" size="small" placeholder="AppId / 商户号">
        </search-input>
      </span>
      <span>
        <el-button size="small" @click="showAddDrawer" type="primary">
          <font-awesome-icon fas icon="plus"></font-awesome-icon>&nbsp;新增
        </el-button>
      </span>
    </el-header>
    <el-main class="ofa-container column">
      <div class="total-box">共计 <label class="ofa-text-primary">{{total}}</label> 条数据</div>
      <el-table v-loading="loading" :data="list" row-key="Id" class="ofa-table">
        <el-table-column prop="AppId" label="AppId"></el-table-column>
        <el-table-column prop="AppName" label="应用名称"></el-table-column>
        <el-table-column prop="Mchid" label="商户号">
          <template slot-scope="scope">{{scope.row.Mchid}}&nbsp;<span v-show="scope.row.Error">
              <font-awesome-icon fas icon="info" class="ofa-text-danger"></font-awesome-icon>&nbsp;{{scope.row.Error}}
            </span></template>
        </el-table-column>
        <el-table-column prop="APIv3Key" label="支付秘钥V3"></el-table-column>
        <el-table-column prop="OrderTimeExpire" label="订单失效" width="100">
          <template slot-scope="scope">{{scope.row.OrderTimeExpire}}分钟</template>
        </el-table-column>
        <el-table-column show-overflow-tooltips prop="CreateTime" label="最后修改时间" width="160">
          <template slot-scope="scope">{{new Date(scope.row.CreateTime).toString('yyyy-MM-dd hh:mm')}}</template>
        </el-table-column>
        <el-table-column prop="CreatorName" label="最后修改人" width="200"></el-table-column>
        <el-table-column label="操作" width="200" align="center" header-align="center">
          <template slot-scope="scope">
            <el-upload :action="uploadUrl" :headers="uploadHeader" :on-success="uploadSuccess" ref="uploader" accept="">
              <el-button @click="entity = scope.row" type="text">{{scope.row.IsUploadCert ? '更新' : '上传'}}商户证书
              </el-button>
            </el-upload>
            <el-button type="text" @click="showUpdateDrawer(scope.row)">修改</el-button>
            <el-button type="text" class="ofa-text-danger" @click="del(scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <!-- 表单 -->
      <el-drawer :visible.sync="drawerVisiable" :modal="false" :show-close="false" direction="rtl" size="400px"
        class="ofa-drawer">
        <div slot="title">
          <span class="title">{{isAdd ? '新增' : '编辑'}}设置</span><label class="title-tips">WxPay Setting</label>
        </div>
        <el-form status-icon ref="form" :rules="validationRules" :model="entity" class="form" label-width="120px"
          size="small">
          <el-alert show-icon title="操作提示" type="warning" style="margin-bottom:20px;">
            <ul class="tips">
              <li>请确保填写数据与微信商户平台相关配置一致，详情请和开发人员了解</li>
            </ul>
          </el-alert>
          <el-form-item label="AppId" prop="AppId">
            <el-input v-model.trim="entity.AppId" size="small" placeholder="请输入微信应用Id">
            </el-input>
          </el-form-item>
          <el-form-item label="应用名称" prop="AppName">
            <el-input v-model.trim="entity.AppName" size="small" placeholder="请输入微信应用名称"></el-input>
          </el-form-item>
          <el-form-item label="商户号" prop="Mchid">
            <el-input v-model.trim="entity.Mchid" size="small" placeholder="请输入微信商户号"></el-input>
          </el-form-item>
          <el-form-item label="支付秘钥V3" prop="APIv3Key">
            <el-input v-model.trim="entity.APIv3Key" size="small" placeholder="请输入微信支付回调校验秘钥v3"></el-input>
          </el-form-item>
          <el-form-item label="订单时效时长" prop="OrderTimeExpire">
            <el-input v-model.trim="entity.OrderTimeExpire" type="number" size="small" placeholder="请输入订单时效时长（分钟）">
            </el-input>
          </el-form-item>
        </el-form>
        <div class="footer">
          <el-button type="primary" @click="submit" size="small">
            <font-awesome-icon fas icon="save"></font-awesome-icon>&nbsp;保存
          </el-button>
          <el-button type="warning" @click="drawerVisiable = false" size="small">
            取消
          </el-button>
        </div>
      </el-drawer>
    </el-main>
  </el-container>
</template>

<script>
import API from '../../../apis/oms-api'
import { WXPAY_SETTING } from '../../../router/oms-router'

// 微信支付设置
export default {
  name: WXPAY_SETTING.name,
  data () {
    return {
      loading: false, // 加载中
      isAdd: false, // 是否添加模式
      drawerVisiable: false, // 抽屉显示
      searchOption: {
        key: '' // 关键字
      },
      total: 1, // 总数据量
      pageIndex: 1, // 页码
      pageSize: 10, // 页数
      list: [],
      entity: {},
      validationRules: {
        AppId: [{ required: true, message: '请先填写AppId', trigger: 'blur' }, { min: 2, max: 50, message: '长度在2到50个字符', trigger: 'blur' }],
        AppName: [{ required: true, message: '请先填写应用名称', trigger: 'blur' }, { min: 2, max: 50, message: '长度在2到50个字符', trigger: 'blur' }],
        Mchid: [{ required: true, message: '请先填写商户号', trigger: 'blur' }, { min: 2, max: 50, message: '长度在2到50个字符', trigger: 'blur' }],
        APIv3Key: [{ required: true, message: '请先填写支付回调秘钥v3', trigger: 'blur' }, { min: 2, max: 50, message: '长度在2到50个字符', trigger: 'blur' }],
        OrderTimeExpire: [{ required: true, message: '请先填写订单时效时长', trigger: 'blur' }]
      }
    }
  },
  computed: {
    permissions () {
      return this.$root.getPermissions(WXPAY_SETTING.name)
    },
    uploadUrl () {
      return this.$root.getApi(API.KEY, API.WXPAY_SETTING.FILE(this.entity.Id))
    },
    uploadHeader () {
      return {
        Authorization: `bearer ${this.$store.getters.access_token}`
      }
    }
  },
  methods: {
    init () {
      if (this.loading) return
      this.get()
    },
    get () {
      this.loading = true
      const url = this.$root.getApi(API.KEY, API.WXPAY_SETTING.URL)
      this.axios
        .get(`${url}/1/10`, {
          params: this.searchOption
        })
        .then(response => {
          if (response) {
            this.total = response.Total
            this.list = response.Items
            this.loading = false
          }
        })
    },
    search () {
      this.get()
    },
    showAddDrawer () {
      this.isAdd = true
      this.entity = {}
      this.drawerVisiable = true
    },
    showUpdateDrawer (row) {
      this.isAdd = false
      this.entity = { ...row }
      this.drawerVisiable = true
    },
    submit () {
      this.$refs.form.validate((valid) => {
        if (valid) {
          if (this.isAdd) {
            this.add()
          } else {
            this.update()
          }
        }
      })
    },
    add () {
      const url = this.$root.getApi(API.KEY, API.WXPAY_SETTING.URL)
      this.axios.post(url, this.entity)
        .then(response => {
          if (response.Status) {
            this.drawerVisiable = false
            this.get()
          }
        })
    },
    update () {
      const url = this.$root.getApi(API.KEY, API.WXPAY_SETTING.URL)
      this.axios.put(url, this.entity)
        .then(response => {
          if (response.Status) {
            this.userDrawerVisiable = false
            this.get()
          }
        })
    },
    del (entity) {
      this.$confirm('确认要删除选中设置？删除后不可恢复，请谨慎操作！', '温馨提示', {
        type: 'warning',
        cancelButtonText: '放弃操作'
      }).then(() => {
        const url = this.$root.getApi(API.KEY, API.WXPAY_SETTING.BATCH_DELETE)
        this.axios.patch(url, [entity.Id]).then(response => {
          if (response.Status) this.get()
        })
      })
    },
    uploadSuccess (response) {
      if (response.Status) {
        this.get()
      } else {
        this.$message.error(response.Message)
        this.$refs.uploader.clearFiles()
      }
    }
  },
  created () {
    this.init()
  }
}
</script>

<style lang="scss"scoped>
.header {
  display: flex;
  align-items: center;
  background-color: #fff;
  justify-content: space-between;
  margin-bottom: 20px;
  border-radius: 10px;

  input {
    width: 250px;
    margin-right: .75rem;
  }

  .search-btn {
    margin-left: 10px;
  }
}

.total-box {
  margin-bottom: 20px;
  font-size: 1.25rem;
  font-weight: 600;

  label {
    font-size: 1.25rem;
    font-weight: 600;
  }
}
</style>
