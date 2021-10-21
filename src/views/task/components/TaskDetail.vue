<template>
  <div class="detail-container">
    <el-form ref="ruleForm" :model="postForm" :rules="rules" label-width="100px">
      <div class="f-title">选择平台及店铺</div>
      <el-form-item label="店铺" prop="shop">
        <el-input v-model="postForm.shopName" />
      </el-form-item>
      <div class="f-title">选择任务类型</div>
      <el-form-item label="任务类型" prop="task">

        <el-radio v-for="(v,k) in taskType" :key="k" v-model="postForm.taskType" :label="v.value">{{ v.label }}</el-radio>

      </el-form-item>
      <el-form-item label="返款类型" prop="task">
        <el-radio-group v-model="postForm.backType">
          <el-radio :label="1">平台返款</el-radio>
          <el-radio :label="2">商家返款</el-radio>
        </el-radio-group>
        <el-tag type="danger" style="margin-left:10px">若选商家返款，免返款服务费，但需在48小时内返款。 平台返款暂时关闭。</el-tag>
      </el-form-item>
      <el-form-item label="实发商品" prop="task">
        <el-radio-group v-model="postForm.backType">
          <el-radio :label="1">平台发礼品</el-radio>
        </el-radio-group>
      </el-form-item>

      <el-form-item
        v-for="(domain, index) in dynamicValidateForm.domains"
        :key="domain.key"
        :label="'关键词' + index"
        :prop="'domains.' + index + '.value'"
        :rules="{
          required: true, message: '内容不能为空', trigger: 'blur'
        }"
      >
        <el-input v-model="domain.value" style="width:500px" /><el-button style="margin-left:10px" @click.prevent="removeDomain(domain)">新增</el-button><el-button @click.prevent="removeDomain(domain)">删除</el-button>
      </el-form-item>

      <div class="f-title">填写任务信息</div>

      <el-form-item label="商品链接" prop="task">
        <el-input placeholder="请输入商品链接" />
      </el-form-item>
      <el-form-item label="商品标题" prop="task">
        <el-input placeholder="请输入商品标题" />
      </el-form-item>

      <el-form-item label="商品主图" prop="task">
        <el-input placeholder="请输入内容" />

      </el-form-item>

      <el-form-item label="客单价" prop="task">
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
import { taskBackType, taskType } from '@/utils/my'

const defaultForm = {
  id: undefined,
  shopId: 1,
  shopName: '',
  taskType: 1,
  backType: 1,
  taskContent: '',
  productUrl: '',
  productName: '',
  product_img: '',
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
  props: {
    isEdit: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      postForm: Object.assign({}, defaultForm),
      rules: {},
      dynamicValidateForm: {
        domains: [{
          value: ''
        }],
        tag: ''
      },
      time: undefined,
      taskBackType: taskBackType,
      taskType: taskType
    }
  },
  methods: {
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
