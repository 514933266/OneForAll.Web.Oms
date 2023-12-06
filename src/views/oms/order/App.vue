<template>
  <div class="PropertyManage">

    <div class="panle-box">

      <div class="center-item">
        <div class="center-title">
          <span class="ofa-text-grey">今日新增订单</span>
          <img src="https://fengwoyun.net/img/todo.79f2f46a.svg" alt="">
        </div>
        <div class="center-bottom">
          <div class="center-num">
            <span class="num-text">56</span>
            <span class="num-type">个</span>
          </div>
          <img src="https://fengwoyun.net/img/todo.79f2f46a.svg" alt="">
        </div>
      </div>

      <div class="center-item">
        <div class="center-title">
          <span class="ofa-text-grey">今日订单金额</span>
          <img src="https://fengwoyun.net/img/todo.79f2f46a.svg" alt="">
        </div>
        <div class="center-bottom">
          <div class="center-num">
            <span class="num-text">8,192.00</span>
            <span class="num-type">元</span>
          </div>
          <img src="https://fengwoyun.net/img/todo.79f2f46a.svg" alt="">
        </div>
      </div>

      <div class="center-item">
        <div class="center-title">
          <span class="ofa-text-grey">订单总金额</span>
          <img src="https://fengwoyun.net/img/todo.79f2f46a.svg" alt="">
        </div>
        <div class="center-bottom">
          <div class="center-num">
            <span class="num-text">12,223.00</span>
            <span class="num-type">元</span>
          </div>
        </div>
      </div>

      <div class="center-item">
        <div class="center-title">
          <span class="ofa-text-grey">取消订单数量</span>
          <img src="https://fengwoyun.net/img/todo.79f2f46a.svg" alt="">
        </div>
        <div class="center-bottom">
          <div class="center-num">
            <span class="num-text">0</span>
            <span class="num-type">个</span>
          </div>
        </div>
      </div>

    </div>

    <div class="search-tab">

      <div class="flex-box">
        <div class="mb24">订单信息：</div>
        <el-input v-model="value1" placeholder="订单号" size="small" clearable class="mr50 mb24" style="width:180px"></el-input>
        <el-select v-model="value2" placeholder="订单来源" size="small" clearable class="mr50 mb24" style="width:180px">
          <el-option v-for="item in options2" :key="item.value" :label="item.label" :value="item.value">
          </el-option>
        </el-select>
        <el-input v-model="value3" placeholder="商品编号" size="small" clearable class="mr50 mb24" style="width:180px"></el-input>
      </div>

      <div class="flex-box">
        <div class="mb24">买家信息：</div>
        <el-input v-model="value4" placeholder="买家账号" size="small" clearable class="mr50 mb24" style="width:180px"></el-input>
        <el-input v-model="value4" placeholder="买家电话" size="small" clearable class="mr50 mb24" style="width:180px"></el-input>
        <el-date-picker class="mr50 mb24" style="width:240px" size="small" v-model="value10" type="daterange" align="right" unlink-panels range-separator="至" start-placeholder="下单时" end-placeholder="间范围" :picker-options="pickerOptions">
        </el-date-picker>
      </div>

      <div class="flex-box">
        <div class="mb24">支付信息：</div>
        <el-select v-model="value2" placeholder="支付方式" size="small" clearable class="mr50 mb24" style="width:180px">
          <el-option v-for="item in options2" :key="item.value" :label="item.label" :value="item.value">
          </el-option>
        </el-select>
        <el-date-picker v-model="value1" type="datetime" placeholder="支付时间" size="small" clearable class="mr50 mb24" style="width:180px"></el-date-picker>
        <el-select v-model="value2" placeholder="支付状态" size="small" clearable class="mr50 mb24" style="width:180px">
          <el-option v-for="item in options2" :key="item.value" :label="item.label" :value="item.value">
          </el-option>
        </el-select>
      </div>

      <el-collapse-transition>
        <div class="flex-box" v-show="show">
          <div class="pb24">物流信息：</div>
          <el-select v-model="value1" placeholder="到货状态" size="small" clearable class="mr50 pb24" style="width:180px">
            <el-option v-for="item in options1" :key="item.value" :label="item.label" :value="item.value">
            </el-option>
          </el-select>
          <el-input v-model="input" size="small" placeholder="物流单号" class="mr50 pb24" clearable style="width:180px"></el-input>
        </div>
      </el-collapse-transition>

      <div class="btn-group">
        <el-button size="mini"> 重 置 </el-button>
        <el-button type="primary" size="mini"> 提 交 </el-button>
      </div>

    </div>
    <div class="trapezoid" @click="show=!show">
      <span> {{ show?'收起':'展开更多'}}</span>
      <i class="el-icon-arrow-down" :class="show?'arrowRotate':'arrow'"></i>
    </div>

    <div class="table-box">
      <div class="title-flex">
        <div class="all-total">共<span>567</span>条数据</div>
        <el-button type="text" icon="el-icon-s-tools">设置查看字段</el-button>
      </div>

      <el-table :data="tableData" style="width: 100%;" class="mb20 hide-borders">
        <el-table-column prop="date" label="商品名称" fixed width="380">
          <template>
            <div class="flex">
              <el-image :src="url" :preview-src-list="srcList" class="img-box"></el-image>
              <div class="tag-content">
                <div class="fw600 f16">蜂窝云财务记账服务</div>
                <div>订单号：10002897</div>
                <div class="tag-box">
                  <el-tag size="small" class="mr10" effect="plain">已发货</el-tag>
                </div>
              </div>
            </div>

          </template>
        </el-table-column>
        <el-table-column prop="address" label="价格" width="150">
          <template>
            <div class="color2e4543 mb6">￥1,000.00</div>
            <div class="colorffa614"> <i class="el-icon-present"></i> 已优惠：￥10.00</div>
          </template>
        </el-table-column>
        <el-table-column prop="address" label="购买账号" width="150">
          <template>
            18262524232
          </template>
        </el-table-column>
        <el-table-column prop="address" label="商品ID">
          <template>
            219277
          </template>
        </el-table-column>
        <el-table-column prop="address" label="支付状态">
          <template>
            <span style="color:#11C261">已支付</span>
            <span style="color:#FFA71A">待支付</span>
            <span style="color:#B2B2B2">已取消</span>
          </template>
        </el-table-column>
        <el-table-column prop="address" label="下单时间" width="200">
          <template>
            2023-09-21 12:23
          </template>
        </el-table-column>
        <el-table-column prop="address" label="支付方式">
          <template>
            微信支付
          </template>
        </el-table-column>
        <el-table-column prop="address" label="订单来源">
          <template>
            公众号
          </template>
        </el-table-column>
        <el-table-column prop="address" label="订单备注" width="200">
          <template>
            请尽快发货，谢谢
          </template>
        </el-table-column>
        <el-table-column prop="address" label="操作" width="100" fixed="right">
          <template>
            <div>
              <el-button type="text" size="mini" class="f14">查看详情</el-button>
            </div>
            <div>
              <el-button type="text" size="mini" class="f14">立即续费</el-button>
            </div>
            <div>
              <el-button type="text" size="mini" class="f14">开发票</el-button>
            </div>
          </template>
        </el-table-column>
      </el-table>

      <!-- 分页 -->
      <div class="pagination-box ">
        <el-pagination background :current-page="currentPage4" :page-sizes="[20,40,80,100]" :page-size="20" layout="total, prev, pager, next, sizes" :total="100">
        </el-pagination>
      </div>

    </div>

  </div>
</template>

<script>
import { ORDER } from '../../../router/oms-router'
export default {
  name: ORDER.name,
  data () {
    return {
      show: false,
      options1: [
        { value: '选项1', label: '住宅' },
        { value: '选项2', label: '别墅' }
      ],
      value1: '',
      options2: [
        { value: '选项1', label: '在售' },
        { value: '选项2', label: '待售' },
        { value: '选项3', label: '售罄' }
      ],
      value2: '',
      options3: [
        { value: '选项1', label: '1室' },
        { value: '选项2', label: '2室' },
        { value: '选项3', label: '3室' },
        { value: '选项4', label: '4室' },
        { value: '选项5', label: '5室' },
        { value: '选项5', label: '5室以上' }
      ],
      value3: '',
      options4: [
        { value: '选项1', label: '50m²以下' },
        { value: '选项2', label: '50~70m²' },
        { value: '选项3', label: '70~90m²' },
        { value: '选项4', label: '90~110m²' },
        { value: '选项5', label: '110~130m²' },
        { value: '选项6', label: '130~150m²' },
        { value: '选项7', label: '150m²以上' }
      ],
      value4: '',
      tableData: [
        { date: '2016-05-02', name: '王小虎', address: '1' },
        { date: '2016-05-04', name: '王小虎', address: '1' },
        { date: '2016-05-01', name: '王小虎', address: '1' },
        { date: '2016-05-03', name: '王小虎', address: '1' }
      ],
      currentPage4: 1,
      url: 'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg',
      srcList: [
        'https://fuss10.elemecdn.com/8/27/f01c15bb73e1ef3793e64e6b7bbccjpeg.jpeg',
        'https://fuss10.elemecdn.com/1/8e/aeffeb4de74e2fde4bd74fc7b4486jpeg.jpeg'
      ],
      value10: '',
      pickerOptions: {
        shortcuts: [{
          text: '最近一周',
          onClick (picker) {
            const end = new Date()
            const start = new Date()
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 7)
            picker.$emit('pick', [start, end])
          }
        }, {
          text: '最近一个月',
          onClick (picker) {
            const end = new Date()
            const start = new Date()
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 30)
            picker.$emit('pick', [start, end])
          }
        }, {
          text: '最近三个月',
          onClick (picker) {
            const end = new Date()
            const start = new Date()
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 90)
            picker.$emit('pick', [start, end])
          }
        }]
      }
    }
  },
  methods: {

  },
  mounted () { }
}
</script>

<style >
.arrow {
  transition: all 0.5s;
  transform: rotate(0deg);
  font-weight: 900;
}
.arrowRotate {
  transition: all 0.5s;
  font-weight: 900;
  transform: rotate(-180deg);
}
.hide-borders .el-table__header-wrapper,
.hide-borders .el-table__body-wrapper {
  border: none;
}
.hide-borders.el-table th.is-leaf {
  border: none;
}
.hide-borders.el-table th,
.hide-borders .el-table__header {
  background: #f7f8fc;
  border-radius: 8px;
  color: #2e3543;
}
.hide-borders .el-table__body tbody tr td {
  border: none;
}
</style>
<style lang="scss" scoped>
.search-tab {
  position: relative;
  padding: 20px 30px 6px;
  background: #ffffff;
  border-radius: 16px;
  color: #2e3543;
  .btn-group {
    position: absolute;
    right: 30px;
    bottom: 30px;
  }
}
.mr50 {
  margin-right: 50px;
}
.mb24 {
  margin-bottom: 24px;
}
.pb24 {
  padding-bottom: 24px;
}
.mr20 {
  margin-right: 20px;
}
.mlr5 {
  margin: 0 5px;
}
.trapezoid {
  display: flex;
  align-items: center;
  justify-content: center;
  color: #a7abba;
  margin: 0 auto;
  margin-top: -3px;
  position: relative;
  width: 122px;
  height: 28px;
  background-color: #fff;
  border-radius: 0 0 10px 10px;
  margin-bottom: 30px;
  cursor: pointer;
  span {
    margin-right: 4px;
  }
}
.trapezoid::before {
  content: '';
  position: absolute;
  top: 0;
  left: -24px;
  width: 0;
  height: 0;
  border-top: 14px solid #fff;
  border-right: 14px solid #fff;
  border-left: 14px solid transparent;
  border-bottom: 14px solid transparent;
  border-radius: 0 0 10px 0;
  cursor: pointer;
}
.trapezoid::after {
  content: '';
  position: absolute;
  top: 0;
  right: -24px;
  width: 0;
  height: 0;
  border-top: 14px solid #fff;
  border-right: 14px solid transparent;
  border-left: 14px solid #fff;
  border-bottom: 14px solid transparent;
  border-radius: 0 0 0 10px;
  cursor: pointer;
}
.flex-box {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
}
.table-box {
  background: #ffffff;
  border-radius: 16px;
  padding: 20px 30px;
}
.select-div {
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  .select-img {
    text-align: center;
    cursor: pointer;
    img {
      width: 76px;
      height: 76px;
      margin-bottom: 10px;
    }
  }
}
.mb20 {
  margin-bottom: 20px;
}
.mr10 {
  margin-right: 10px;
}
// 表格区域
.tag-box {
  margin-top: 8px;
}
.fw600 {
  font-weight: 600;
}
.f14 {
  font-size: 14px;
}
.f16 {
  font-size: 16px;
}
.pagination-box {
  padding-right: -20px;
  display: flex;
  align-items: center;
  justify-content: flex-end;
}
.flex {
  display: flex;
  .img-box {
    margin-right: 20px;
    width: 150px;
    height: 120px;
    border-radius: 8px 8px 8px 8px;
  }
  .tag-content {
    display: flex;
    flex-direction: column;
    justify-content: space-around;
  }
}
.color2e4543 {
  color: #2e3543;
}
.colorffa614 {
  color: #ffa614;
}
.mb6 {
  margin-bottom: 6px;
}
.title-flex {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 22px;
  .all-total {
    font-size: 18px;
    font-weight: 500;
    color: #2e3543;
    span {
      font-size: 20px;
      color: #409eff;
    }
  }
}
.panle-box {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  justify-content: space-between;
  margin-bottom: 20px;
  > div {
    width: 22%;
    min-width: 259px;
    height: 150px;
    background: #fff;
    border-radius: 16px;
    margin-bottom: 10px;
    .center-title {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin: 20px 30px 10px;

      img {
        width: 44px;
        height: 44px;
        margin-left: 99px;
      }

      span {
        font-size: 14px;
        font-weight: 500;
        line-height: 20px;
      }
    }
    .center-bottom {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin: 20px 30px 10px 0;
    }
    .center-num {
      margin-left: 30px;

      .num-text {
        font-size: 24px;
        font-weight: bold;
        color: #2e3543;
        line-height: 31px;
        margin-right: 8px;
      }

      .num-type {
        font-size: 16px;
        font-weight: 500;
        color: #2e3543;
        line-height: 24px;
      }
    }
  }
}
</style>
