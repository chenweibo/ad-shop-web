<template>
  <div class="detail-container">
    <el-form ref="ruleForm" :model="postForm" :rules="rules" label-width="100px">
      <div class="f-title">选择平台及店铺</div>
      <el-form-item label="店铺" prop="shopId">

        <el-select v-model="postForm.shopId" placeholder="请选择">
          <el-option
            v-for="item in shopList"
            :key="item.id"
            :label="item.taobaoName"
            :value="item.id"
          />
        </el-select>
        <el-tag style="margin-left:10px">如果没有店铺选项说明店铺正在审核中，请审核通过后再发布任务</el-tag>

      </el-form-item>
      <div class="f-title">选择任务类型</div>
      <el-form-item label="任务类型" prop="task">

        <el-radio v-for="(v,k) in taskType" :key="k" v-model="postForm.taskType" :label="v.value" @change="changeType">{{ v.label }}</el-radio>

      </el-form-item>
      <el-form-item label="返款类型" prop="task">
        <el-radio-group v-model="postForm.backType">
          <el-radio :label="1">平台返款</el-radio>
          <el-radio :label="2" :disabled="isBack===0?true:false">商家返款</el-radio>
        </el-radio-group>
        <el-tag type="danger" style="margin-left:10px">若选商家返款，免返款服务费，但需在48小时内返款。 平台返款暂时关闭。</el-tag>
      </el-form-item>
      <el-form-item label="实发商品" prop="task">
        <el-radio-group v-model="t">
          <el-radio :label="1">平台发礼品</el-radio>
        </el-radio-group>
      </el-form-item>

      <!-- <el-form-item :label="curTypeName">
        <el-input v-model="dynamicValidateForm.item.value" style="width:300px" /> 添加  <el-input v-model="dynamicValidateForm.item.count" style="width:100px" /> 单   <el-button type="primary" size="mini" @click.prevent="addTpye()">添加</el-button>
      </el-form-item> -->
      <el-form-item
        v-for="(domain, index) in dynamicValidateForm.domains"
        :key="index"
        :label="curTypeName"
      >
        <el-input v-model="domain.value" style="width:300px" /> 添加  <el-input v-model="domain.count" style="width:100px" /> 单  <el-button v-show="index==0" type="primary" size="mini" style="margin-left:10px" @click.prevent="addTpye()">添加</el-button>  <el-button v-show="index!==0" size="mini" @click.prevent="removeTypeItem(domain)">删除</el-button>
      </el-form-item>

      <div class="f-title">填写任务信息</div>

      <el-form-item label="商品链接" prop="productUrl">
        <el-input placeholder="请输入商品链接" />
      </el-form-item>
      <el-form-item label="商品标题" prop="productName">
        <el-input placeholder="请输入商品标题" />
      </el-form-item>

      <el-form-item label="商品主图" prop="productImg">
        <SingleImage v-model="postForm.productImg" />
      </el-form-item>

      <el-form-item label="客单价" prop="price">
        <el-input-number v-model="postForm.price" :precision="2" :step="1" />
      </el-form-item>

      <el-form-item label="每单拍多少件" prop="task">
        <el-input-number v-model="postForm.count" :step="1" />
      </el-form-item>

      <el-form-item label="任务时间" prop="task">
        <el-date-picker
          v-model="time"
          type="datetimerange"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
        />
      </el-form-item>
      <el-form-item label="放出类型" prop="task">

        <el-radio v-for="(v,k) in taskBackType" :key="k" v-model="postForm.runType" :label="v.value">{{ v.label }}</el-radio>
        【一次性放出】任务审核通过立即全部放出；【平均放出】任务在发布时间段内平均放出。
      </el-form-item>
      <el-form-item label="是否开通淘客" prop="task">
        <el-radio-group v-model="postForm.isTbk">
          <el-radio :label="1">是</el-radio>
          <el-radio :label="0">否</el-radio>

        </el-radio-group>
        为避免用户使用淘客下单造成损失，请务必在返款之前审核是否走淘客链接，或临时关闭淘客推广。返款后造成的佣金损失，平台不予处理！！！
      </el-form-item>
      <el-form-item label="额外要求" prop="task">
        <el-input
          v-model="postForm.extra"
          type="textarea"
          :autosize="{ minRows: 4, maxRows: 6}"
          placeholder="请输入其他要求"
        /></el-form-item>
      <el-form-item label="任务名称" prop="task">
        <el-input placeholder="为了商家自行区分，仅商家可用" />
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="onSubmit">保存</el-button>
      </el-form-item>
    </el-form>

  </div>
</template>
<script>
import { taskBackType, taskType, taskTypeL } from '@/utils/my'
import { getMyShop } from '@/api/shop'
import { mapGetters } from 'vuex'
import SingleImage from '@/components/Upload/SingleImage4.vue'

const defaultForm = {
  id: undefined,
  shopId: undefined,
  shopName: '',
  taskType: 1,
  backType: 1,
  taskContent: '',
  productUrl: '',
  productName: '',
  productImg: '',
  price: 0,
  count: 1,
  startTime: '',
  endTime: '',
  runType: 1,
  isTbk: 0,
  extra: '',
  taskName: ''

}
export default {
  name: 'TaskDetail',
  components: { SingleImage },
  props: {
    isEdit: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      postForm: Object.assign({}, defaultForm),
      rules: {
        shopId: [
          { required: true, message: '请选择店铺', trigger: 'change' }
        ],
        productUrl: [
          { required: true, message: '请选择商品缩略图', trigger: 'change' }
        ],
        productName: [
          { required: true, message: '请输入产品名称', trigger: 'change' }
        ],
        productImg: [
          { required: true, message: '请选择产品主图', trigger: 'change' }
        ],
        price: [
          { required: true, message: '请输入客单价', trigger: 'change' }
        ]
      },
      time: undefined,
      taskBackType: taskBackType,
      taskType: taskType,
      shopList: [],
      t: 1,
      curTypeName: '搜索下单',
      dynamicValidateForm: {
        domains: [{
          count: '',
          value: ''
        }]
      }
    }
  },
  computed: {
    ...mapGetters([
      'isBack'
    ])
  },
  created() {
    this.getshop()
  },
  methods: {
    removeTypeItem(item) {
      var index = this.dynamicValidateForm.domains.indexOf(item)
      if (index !== -1) {
        this.dynamicValidateForm.domains.splice(index, 1)
      }
    },
    addTpye() {
      this.dynamicValidateForm.domains.push({
        value: '',
        count: ''
      })
    },
    changeType(v) {
      this.curTypeName = taskTypeL[v]
    },
    getshop() {
      getMyShop().then(res => {
        this.shopList = res.data
      })
    },
    onSubmit() {
      this.$refs.ruleForm.validate(valid => {
        if (valid) {
          console.log(valid)
        } else {
          console.log('error submit!!')
          return false
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.detail-container {
   padding: 40px 45px 20px 50px;

}
.f-title{
  width: 100%;
  height: 50px;
  line-height: 50px;
  background-color: #42b983;
  text-align: center;
  color: #fff;
  font-weight:block;
  margin: 20px 0 20px 0;
}

</style>
